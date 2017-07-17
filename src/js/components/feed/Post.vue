<template>
    <div class="card" :class="{highlighted: isNew}">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <Avatar class-name="is-md-avatar" :username="user.username" :images="user.avatar"/>
                </div>

                <div class="media-content">
                    <ext-link :to="toPost(post)" :utm="true" class-name="is-6 fw-bold mb-0">
                        {{ post.title }}
                    </ext-link>
                    <div>
                        <ext-link :to="toUser(user)" :utm="true">
                            <small><strong v-text="user.name"></strong></small>
                            <small>@{{ user.username }}</small>
                        </ext-link>
                        <small>&nbsp;&nbsp;&nbsp;&nbsp;{{ post.published_at | humanize-time }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="sass">
    .card
        &.highlighted
            background-color: rgba(75, 205, 159, .15)

            &:hover
                background-color: rgba(75, 205, 159, .35)
</style>

<script>
    import utils from '../../util';
    import Avatar from '../commons/Avatar.vue';
    import humanizeTime from '../../filters/humanizeTime'

    export default {
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

        components: {
            Avatar
        },

        filters: {
            humanizeTime
        },

        computed: {
            user () {
                return this.post.user.data;
            }
        },

        methods: {
            toPost: utils.postUrl,
            toUser: utils.userUrl
        }
    }
</script>
