<template>
    <div class="notification-container">
        <template v-for="notification in notifications">
            <notification-card
                :key="notification.id"
                :notification="notification"
            />
        </template>

        <infinite-loading
            spinner="spiral"
            ref="loader"
            :on-infinite="getNotifications"
        />
    </div>
</template>

<script>
    import NotificationCard from './Card.vue';
    import InfiniteLoading from 'vue-infinite-loading';
    import Notifications from '../../services/Notifications';
    import { UNREAD_NOTIFICATIONS } from '../../constants';
    import {getNotifications} from 'viblo-sdk/api/me'

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

        methods: {
            getNotifications() {
                getNotifications({ page: this.nextPage })
                    .then(({ notifications }) => {
                        this.notifications = [...this.notifications, ...notifications.data];

                        const pagination = notifications.meta.pagination;
                        const nextPage = pagination.current_page < pagination.total_pages
                            ? pagination.current_page + 1
                            : null;
                        this.nextPage = nextPage;
                        this.$refs.loader.$emit(
                            nextPage ? '$InfiniteLoading:loaded' : '$InfiniteLoading:complete'
                        );
                    })
            }
        },

        mounted() {
            this.getNotifications();

            Notifications.getLastOpen(UNREAD_NOTIFICATIONS)
                .then((lastOpen) => {
                    this.lastOpen = lastOpen;
                });
        }
    }
</script>
