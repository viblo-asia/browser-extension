<template>
    <div>
        <section class="hero is-dark mb-1" v-once>
            <div class="hero-body">
                <div class="container">
                    <a href="https://viblo.asia" target="__blank">
                        <h1 class="title color-primary">VIBLO</h1>
                    </a>
                    <h2 class="subtitle">Free service for technical knowledge sharing.</h2>
                    <button @click="logout" class="button is-danger is-inverted">Logout</button>
                </div>
            </div>
        </section>

        <div class="content-wrapper">
            <tabs>
                <tab name="Notifications" :selected="true">
                    <notifications></notifications>
                </tab>

                <tab name="Newst Posts">
                    <feed-newest></feed-newest>
                </tab>
            </tabs>
        </div>
    </div>
</template>

<script>
    import Tab from './tabs/Tab.vue';
    import Tabs from './tabs/Tabs.vue';
    import FeedNewest from './feed/Newest.vue';
    import {NOTIFICATION_KEY} from '../constants';
    import Storage from '../storage/ChromeSyncStorage';
    import LocalStorage from '../storage/LocalStorage';
    import Notifications from './notifications/List.vue';

    export default {
        components: {
            Tab,
            Tabs,
            FeedNewest,
            Notifications
        },

        methods: {
            logout() {
                let storage = new Storage();
                storage.delete('oauthToken', () => chrome.runtime.reload());
            }
        },

        mounted() {
            LocalStorage.remove(NOTIFICATION_KEY);
            chrome.browserAction.setBadgeText({text: ''});
        }
    }
</script>
