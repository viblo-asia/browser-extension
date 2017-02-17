<template>
    <div>
        <a href="https://viblo.asia" target="_blank">
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
                <tab name="Newst Posts" :selected="true" :position="1">
                    <feed-newest></feed-newest>
                </tab>

                <tab name="Notifications" v-if="authenticated" :position="2">
                    <notifications></notifications>
                </tab>

                <tab name="Settings" :position="3">
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
    import Tab from './tabs/Tab.vue';
    import Tabs from './tabs/Tabs.vue';
    import Options from './Options.vue';
    import Badge from '../services/Badge';
    import {API_USER} from '../constants';
    import FeedNewest from './feed/Newest.vue';
    import Notifications from './notifications/List.vue';
    import {syncedStorage, localStorage} from '../storage/ChromeStorage';

    export default {
        data() {
            return {
                currentUser: null,
                authenticated: false
            };
        },

        components: {
            Tab,
            Tabs,
            Options,
            FeedNewest,
            Notifications
        },

        methods: {
            getCurrentUser() {
                axios.get(API_USER)
                    .then((response) => this.currentUser = response.data.data);
            }
        },

        computed: {
            userUrl() {
                return `${EXTENSION_ROOT_URL}/u/${this.currentUser.username}`;
            }
        },

        created() {
            syncedStorage.find('authenticated', (value) => {
                this.authenticated = value;

                if (this.authenticated) {
                    this.getCurrentUser();
                }
            });
        },

        mounted() {
            // TODO: clear the counters and badge text
        }
    }
</script>
