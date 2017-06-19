<template>
    <div class="notification-item" :class="{ 'new': !notification.is_read }">
        <div class="avt-ctn">
            <a v-if="hasSender()" class="avatar" @click.prevent="toSender">
                <img :src="notification.sender.data.avatar[1]" :alt="notification.sender.data.name"></img>
            </a>
        </div>

        <!-- Legacy notification only -->
        <div v-if="notification.data.message" class="notification-message">
            <span class="mb-0" v-html="message(notification)"></span>
            <br/>
            <small>{{ notification.created_at | humanize-time }}</small>
        </div>

        <a v-else class="notification-message" @click.prevent="toMessage">
            <div>
                <span class="mb-0" v-html="message(notification)"></span>
                <br/>
                <small>{{ notification.created_at | humanize-time }}</small>
            </div>
        </a>
    </div>
</template>

<script>
    import utils from '../../util';
    import Tab from '../../services/Tab';
    import _flow from 'lodash/fp/flow'
    import { message, url } from './messages'
    import humanizeTime from '../../filters/humanizeTime'

    export default {
        props: {
            notification: {
                type: Object,
                required: true
            }
        },

        filters: {
            humanizeTime
        },

        methods: {
            message,
            toMessage() {
                const href = _flow(url, utils.utmUrl)(this.notification)
                console.log(href)
                Tab.create(href)
            },

            toSender() {
                const url = utils.userUrl(this.notification.sender.data)
                Tab.create(url)
            },

            hasSender() {
                return !_.isEmpty(this.notification.sender);
            }
        }
    }
</script>
