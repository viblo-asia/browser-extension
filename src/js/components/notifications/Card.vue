<template>
    <li :class="wrapperClass">
        <a :href="getSenderProfile()" v-if="hasSender()" class="avatar is-md-avatar" target="_blank">
            <img :src="notification.sender.avatar" :alt="notification.sender.name">
        </a>
        <span :class="['notification-message', hasSender() ? '' : 'no-sender']">
            <span v-html="notification.message"></span>
            <br/>
            <small class="notification-time" v-text="notification.time"></small>
        </span>
    </li>
</template>

<style lang="sass">
    .notification-item
        &.unread
            background-color: rgba(75, 205, 159, .15)

            &:hover
                background-color: rgba(75, 205, 159, .35)
</style>

<script>
    import Tab from '../../services/Tab';

    export default {
        props: {
            notification: {
                type: Object,
                required: true
            }
        },

        methods: {
            isUnread() {
                let readAt = this.notification.read_at;

                return _.isNull(readAt) || _.isUndefined(readAt);
            },

            hasSender() {
                return !_.isEmpty(this.notification.sender);
            },

            getSenderProfile() {
                return this.linkToUser(this.notification.sender);
            },

            linkToUser(user) {
                if (user.url) {
                    return user.url;
                }

                if (!user || !user.hasOwnProperty('username')) {
                    throw new Error('Invalid user provided');
                }

                return `${EXTENSION_ROOT_URL}/u/${user.username}`;
            }
        },

        computed: {
            wrapperClass: function() {
                return {
                    'read': !this.isUnread(),
                    'notification-item': true,
                    'unread': this.isUnread()
                };
            }
        },

        mounted() {
            let nodes = this.$el.querySelectorAll('a');
            _.each(nodes, (node) => {
                const url = node.getAttribute('href');
                node.setAttribute('href', '#');
                node.addEventListener('click', (e) => {
                    e.preventDefault();
                    Tab.create(url);
                })
            });
        }
    }
</script>
