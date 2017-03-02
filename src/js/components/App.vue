<template>
    <div>
        <a href="https://viblo.asia" tabindex="-1" target="_blank">
            <div class="hero">
                <div class="hero-body">
                    <div class="container">
                        <div>
                            <h2 class="title">VIBLO</h2>
                            <h3 class="subtitle">Free service for technical knowledge sharing.</h3>
                        </div>

                        <div v-if="currentUser">
                            <a :href="userUrl" class="avatar" target="_blank" :title="currentUser.name">
                                <img :src="currentUser.avatar" :alt="currentUser.name" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </a>

        <div class="content-wrapper">
            <tabs class="navigation">
                <tab id="newest-posts" name="Newest Posts" :selected="true" :position="1"
                    @selected="this.readNewPosts" @leave="clearTabBadge('newPosts')"
                    :badge="this.counters.newPosts"
                >
                    <feed-newest></feed-newest>
                </tab>

                <tab id="notifications" name="Notifications" v-if="authenticated" :position="2"
                    @selected="this.clearNotifications" @leave="clearTabBadge('unreadNotifications')"
                    :badge="this.counters.unreadNotifications"
                >
                    <notifications></notifications>
                </tab>

                <tab id="settings" name="Settings" :position="3">
                    <options></options>
                </tab>
            </tabs>
        </div>
    </div>
</template>

<style lang="sass">
    .navigation > .tabs:not(:last-child)
        margin-bottom: .8em

    .hero-body
        padding: 1em
        padding-bottom: 0

        .container
            display: flex
            align-items: center
            justify-content: space-between

            .avatar > img
                border: 2px solid #4bcd9f
</style>

<script>
    import api from '../api';
    import Tab from './tabs/Tab.vue';
    import Tabs from './tabs/Tabs.vue';
    import Options from './Options.vue';
    import FeedNewest from './feed/Newest.vue';
    import Notifications from './notifications/List.vue';
    import {syncedStorage} from '../storage/ChromeStorage';
    import Counter from '../services/Counter';
    import NotificationsService, {NEW_POSTS, UNREAD_NOTIFICATIONS} from '../services/Notifications';

    export default {
        data() {
            return {
                currentUser: null,
                authenticated: false,
                counters: {
                    newPosts: 0,
                    unreadNotifications: 0
                }
            };
        },

        components: {
            Tab,
            Tabs,
            Options,
            FeedNewest,
            Notifications
        },

        computed: {
            userUrl() {
                return `${EXTENSION_ROOT_URL}/u/${this.currentUser.username}`;
            }
        },

        methods: {
            readNewPosts() {
                NotificationsService.clear(NEW_POSTS);
            },

            clearNotifications() {
                NotificationsService.clear(UNREAD_NOTIFICATIONS);
            },

            clearTabBadge(type) {
                if (this.counters.hasOwnProperty(type)) {
                    this.counters[type] = 0;
                }
            }
        },

        created() {
            syncedStorage.find('authenticated', (value) => {
                this.authenticated = value;

                if (this.authenticated) {
                    api.getUser().then((user) => this.currentUser = user);
                }
            });

            Counter.get(null, (counters) => {
                const { newPosts, unreadNotifications } = counters;
                this.counters = {  newPosts, unreadNotifications  };
            });
        },
    }
</script>
