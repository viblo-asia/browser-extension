<template>
    <div class="notification-container">
        <template v-for="notification in notifications">
            <notification-card
                :key="notification.id"
                :notification="notification"
            />
        </template>

        <infinite-loading
            ref="loader"
            spinner="spiral"
            @infinite="fetch"
        />
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import { getNotifications } from 'viblo-sdk/api/me';

    import NotificationCard from './Card.vue';
    import { UNREAD_NOTIFICATIONS } from '../../constants';
    import Notifications from '../../services/Notifications';

    export default {
        components: {
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

            Notifications.getLastOpen(UNREAD_NOTIFICATIONS)
                .then((lastOpen) => {
                    this.lastOpen = lastOpen;
                });
        },

        methods: {
            fetch() {
                getNotifications({ page: this.nextPage })
                    .then(({ notifications }) => {
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
