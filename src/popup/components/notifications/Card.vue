<template>
    <component
        :is="wrapperType"
        :to="message.url"
        :class="{ 'item--new': !notification.is_read, legacy: !message.url }"
        class="item notification-item text-black"
    >
        <div class="item__icon">
            <avatar
                v-if="sender !== null"
                :username="sender.username"
                :images="sender.avatar"
                class="avatar-md"
            />
        </div>

        <div class="item__content">
            <span class="item-title" v-html="message.html"/>

            <div class="item__meta">
                <span class="item__time text-muted">
                    {{ notification.created_at | humanize-time }}
                </span>
            </div>
        </div>
    </component>
</template>

<script>
    import _get from 'lodash/get';
    import humanizeTime from '../../filters/humanizeTime';
    import Avatar from '../commons/Avatar.vue';

    export default {
        components: {
            Avatar
        },

        filters: {
            humanizeTime
        },

        props: {
            notification: {
                type: Object,
                required: true
            }
        },

        computed: {
            wrapperType() {
                return this.message.url ? 'ext-link' : 'div';
            },

            sender() {
                return _get(this.notification, 'sender.data', null);
            },

            message() {
                const data = this.notification.data;

                return data.message ? {
                    html: data.message
                } : {
                    html: _get(data, 'title.html'),
                    url: data.url
                };
            }
        }
    };
</script>

<style lang="scss">
    @import "../../scss/variables";

    .notification-item {
        b {
            color: $primary;
            font-weight: 600;
        }

        &.legacy {
            a {
                color: $primary;
                font-weight: 600;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

</style>

