<template>
    <ext-link :to="url" :class="{ 'item--new': highlight }" class="item">
        <div class="item__icon">
            <avatar
                :username="user.username"
                :images="user.avatar"
                class="avatar-md"
            />
        </div>

        <div class="item__content">
            <h3 class="item__title">
                <slot/>
            </h3>

            <div class="item__meta">
                <ext-link :to="userPage" class="user-info">
                    <span class="user-info__name text-black">{{ user.name }}</span>
                    <span class="user-info__username text-muted">@{{ user.username }}</span>
                </ext-link>
                <span class="dot"/>

                <span class="item__time text-muted">{{ time | humanize-time }}</span>

                <slot name="extra-info"/>
            </div>
        </div>
    </ext-link>
</template>

<script>
    import { toUser } from '~/utils/url';
    import Avatar from '../commons/Avatar.vue';
    import humanizeTime from '../../filters/humanizeTime';

    export default {
        components: {
            Avatar
        },

        filters: {
            humanizeTime
        },

        props: {
            url: String,
            user: Object,
            time: String,
            highlight: Boolean
        },

        computed: {
            userPage() {
                return toUser(this.user);
            }
        }
    };
</script>

<style lang="scss">
    .item {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: .5em 0;
        word-break: break-word;
        border-bottom: 1px solid #f0f0f0;

        &:hover {
            background-color: #f6f6f7;
        }

        &--new {
            background-color: rgba(64, 158, 255, 0.1);

            &:hover {
                background-color: rgba(64, 158, 255, 0.2);
            }
        }

        &__icon {
            width: 40px;
            flex: 0 0 auto;
            margin-right: 1rem;
            margin-left: .5rem;
        }

        &__content {
            flex: 1;
        }

        &__title {
            font-size: 14.5px;
            font-weight: 600;
            margin-bottom: 0;
        }

        &__meta {
            font-size: 13px;

            .user-info {
                &__name {
                    font-weight: 500;
                }
            }
        }
    }

    .dot {
        &:before {
            content: "\00b7";
            font-size: 16px;
            line-height: 16px;
        }
    }
</style>
