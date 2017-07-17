<template>
    <div>
        <a href="https://viblo.asia" tabindex="-1" target="_blank">
            <div class="hero">
                <div class="hero-body">
                    <div class="container">
                        <div>
                            <div class="title">
                                <img class="logo" :src="logo"/>
                                <span>iblo's News Feed</span>
                            </div>
                            <h3 class="subtitle">Free service for technical knowledge sharing.</h3>
                        </div>

                        <Avatar v-if="currentUser" :username="currentUser.username" :images="currentUser.avatar"/>
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
                    <options :authenticated="authenticated"></options>
                </tab>
            </tabs>
        </div>

        <div class="footer">
            <a class="rate" @click="storePage"><span>If you like Viblo's News Feed, please </span><span class="color-primary hoverable">rate us!</span></a>
        </div>
    </div>
</template>

<script>
    import EventBus from './EventBus';
    import Tab from './tabs/Tab.vue';
    import Tabs from './tabs/Tabs.vue';
    import Options from './Options.vue';
    import Avatar from './commons/Avatar.vue'
    import FeedNewest from './feed/Newest.vue';
    import Notifications from './notifications/List.vue';

    import Auth from '../services/Auth';
    import Counter from '../services/Counter';
    import BrowserTab from '../services/Tab';
    import {syncedStorage} from '../storage/ChromeStorage';
    import NotificationsService from '../services/Notifications';
    import {NEW_POSTS, UNREAD_NOTIFICATIONS, STORE_PAGE} from '../constants.js';

    export default {
        data() {
            return {
                logo: chrome.runtime.getURL('images/icon64.png'),
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
            Avatar,
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
            },

            storePage() {
                BrowserTab.create(STORE_PAGE);
            }
        },

        created() {
            this.readNewPosts();

            syncedStorage.find('authenticated', (value) => {
                this.authenticated = value;

                if (this.authenticated) {
                    Auth.get().then((user) => {
                        this.currentUser = user;
                    });
                }
            });

            Counter.get(null, (counters) => {
                const { newPosts, unreadNotifications } = counters;
                this.counters = {  newPosts, unreadNotifications  };
            });

            EventBus.$on('logged-in', (user) => {
                this.currentUser = user;
                this.authenticated = true;
            });
        },
    }
</script>

<style lang="sass" scoped>
    .title
        display: flex

        .logo
            height: 25px

        span
            font-size: 1.5rem
            line-height: 25px
            color: #6b717b

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

    .footer
        padding: 5px
        text-align: center

        .rate
            font-size: 0.9rem
            color: #888
</style>
