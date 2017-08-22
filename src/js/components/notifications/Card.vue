<template>
    <div class="notification-item" :class="{ 'new': !notification.is_read }">
        <div class="avt-ctn">
            <Avatar v-if="sender !== null" :username="sender.username" :images="sender.avatar" class-name="is-md-avatar"/>
        </div>

        <!-- Legacy notification only -->
        <div v-if="notification.data.message" class="notification-message">
            <span class="mb-0" v-html="message.html"></span>
            <br/>
            <small>{{ notification.created_at | humanize-time }}</small>
        </div>

        <ext-link v-else :to="message.url" class-name="notification-message">
            <div>
                <span class="mb-0" v-html="message.html"></span>
                <br/>
                <small>{{ notification.created_at | humanize-time }}</small>
            </div>
        </ext-link>
    </div>
</template>

<script>
    import _get from 'lodash/get'
    import humanizeTime from '../../filters/humanizeTime'
    import Avatar from '../commons/Avatar.vue'

    export default {
        props: {
            notification: {
                type: Object,
                required: true
            }
        },

        computed: {
            sender() {
                return _get(this.notification, 'sender.data', null)
            },
            message() {
                const data = this.notification.data

                return data.message ? {
                    html: data.message
                } : {
                    html: _get(data, 'title.html'),
                    url: data.url
                }
            }
        },

        components: {
            Avatar
        },

        filters: {
            humanizeTime
        }
    }
</script>
