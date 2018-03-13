<template>
    <el-scrollbar class="notification-container">
        <notification-card
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
        />

        <infinite-loading
            ref="loader"
            spinner="spiral"
            @infinite="fetch"
        />
    </el-scrollbar>
</template>

<script>
    import { mapActions } from 'vuex';
    import { TabTypes } from '~/utils/enums';
    import InfiniteLoading from 'vue-infinite-loading';
    import { getNotifications } from 'viblo-sdk/api/me';

    import Item from '../commons/Item.vue';
    import NotificationCard from '../notifications/Card.vue';

    export default {
        components: {
            Item,
            InfiniteLoading,
            NotificationCard
        },

        data() {
            return {
                notifications: [],
                nextPage: 1
            };
        },

        mounted() {
            this.fetch();
        },

        methods: {
            ...mapActions({
                setBadge: 'badges/set'
            }),

            fetch() {
                getNotifications({ page: this.nextPage })
                    .then(({ counter, notifications }) => {
                        this.setBadge({ type: TabTypes.Notifications, value: counter });

                        this.notifications = [...this.notifications, ...notifications.data];

                        const pagination = notifications.meta.pagination;
                        const nextPage = pagination.current_page < pagination.total_pages
                            ? pagination.current_page + 1
                            : null;
                        this.nextPage = nextPage;

                        if (nextPage) {
                            this.$refs.loader.stateChanger.loaded();
                        } else {
                            this.$refs.loader.stateChanger.complete();
                        }
                    });
            }
        }
    };
</script>
