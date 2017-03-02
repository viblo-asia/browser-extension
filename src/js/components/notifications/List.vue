<template>
    <ul class="notification-container">
        <template v-for="notification in normalizedNotifications">
            <notification-card
                :key="notification.id"
                :notification="notification"
            />
        </template>

        <infinite-loading
            spinner="spiral"
            ref="infiniteLoading"
            :on-infinite="getNotifications"
        />
    </ul>
</template>

<script>
    import NotificationCard from './Card.vue';
    import InfiniteLoading from 'vue-infinite-loading';
    import {API_NOTIFICATIONS} from '../../constants';
    import Notifications, {UNREAD_NOTIFICATIONS} from '../../services/Notifications';

    export default {
        components: {
            InfiniteLoading,
            NotificationCard
        },

        data() {
            return {
                notifications: [],
                nextPageUrl: API_NOTIFICATIONS
            };
        },

        methods: {
            getNotifications() {
                axios.get(this.nextPageUrl)
                    .then(({data}) => {
                        let {paginator} = data.data;
                        let notifications = this.notifications;
                        this.notifications = _.concat(notifications, paginator.data);

                        let nextPageUrl = paginator.next_page_url;
                        if (nextPageUrl) {
                            this.nextPageUrl = nextPageUrl;
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                        } else {
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                        }
                    });
            }
        },

        computed: {
            normalizedNotifications: function() {
                let notifications = _.cloneDeep(this.notifications);

                return _.map(notifications, notification => {
                    let time = moment();
                    if (notification.hasOwnProperty('created_at')) {
                        time = moment(notification.created_at);
                    }

                    if (moment().diff(time, 'days') > 3) {
                        time = time.format("MMMM D YYYY [at] h:mma");
                    } else {
                        time = time.fromNow();
                    }

                    if (notification.hasOwnProperty('data')) {
                        notification = _.assign({}, notification, notification.data);
                        notification = _.omit(notification, 'data');
                    }

                    notification = _.assign(notification, { time });

                    return notification;
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
