<template>
    <main id="main">
        <tabs initial-active-pane="posts">
            <tab-pane
                :index="1"
                :badge="badges.newPosts"
                name="posts"
                label="Posts"
                @enter="clearNewPosts"
                @leave="clearVisibleBadge('newPosts')"
            >
                <new-posts/>
            </tab-pane>

            <tab-pane
                :index="2"
                :badge="badges.newQuestions"
                name="questions"
                label="Questions"
                @enter="clearNewQuestions"
                @leave="clearVisibleBadge('newQuestions')"
            >
                <new-questions/>
            </tab-pane>

            <tab-pane
                v-if="authenticated"
                :index="3"
                :badge="badges.unreadNotifications"
                name="notifications"
                label="Notifications"
                @enter="clearNotifications"
                @leave="clearVisibleBadge('unreadNotifications')"
            >
                <notifications/>
            </tab-pane>

            <tab-pane
                :index="4"
                name="settings"
                label="Settings"
            >
                <settings/>
            </tab-pane>
        </tabs>
    </main>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import Tabs from '../tabs/Tabs.vue';
    import TabPane from '../tabs/TabPane.vue';
    import NewPosts from './NewPosts.vue';
    import NewQuestions from './NewQuestions.vue';
    import Notifications from './Notifications.vue';
    import Settings from './Settings.vue';


    export default {
        components: {
            Tabs,
            TabPane,
            NewPosts,
            NewQuestions,
            Notifications,
            Settings
        },

        computed: {
            ...mapGetters({
                authenticated: 'authenticated',
                badges: 'badges/all'
            })
        },

        methods: {
            ...mapActions('badges', ['clearVisibleBadge']),
            ...mapActions([
                'clearNewPosts',
                'clearNewQuestions',
                'clearNotifications'
            ])
        }
    };
</script>

<style lang="scss">
    #main {
        padding: 1em;
    }
</style>

