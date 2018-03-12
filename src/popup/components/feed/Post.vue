<template>
    <div :class="{highlighted: isNew}" class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <avatar
                        :username="user.username"
                        :images="user.avatar"
                        class-name="is-md-avatar"
                    />
                </div>

                <div class="media-content">
                    <ext-link :to="toPost(post)" :utm="true" class-name="is-6 fw-bold mb-0">
                        {{ post.title }}
                    </ext-link>
                    <div>
                        <ext-link :to="toUser(user)" :utm="true">
                            <small><strong v-text="user.name"/></small>
                            <small>@{{ user.username }}</small>
                        </ext-link>
                        <small>&nbsp;&nbsp;&nbsp;&nbsp;{{ post.published_at | humanize-time }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { toPost, toUser } from '~/utils/url';
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
            post: {
                type: Object,
                required: true
            },

            'is-new': {
                type: Boolean,
                default: false
            }
        },

        computed: {
            user() {
                return this.post.user.data;
            }
        },

        methods: {
            toPost,
            toUser
        }
    };
</script>

<style lang="sass">
    .card
        &.highlighted
            background-color: rgba(75, 205, 159, .15)

            &:hover
                background-color: rgba(75, 205, 159, .35)
</style>
