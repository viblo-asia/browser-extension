<template>
    <div class="card" :class="{highlighted: isNew}">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image avatar is-md-avatar">
                        <img :src="post.user.avatar">
                    </figure>
                </div>

                <div class="media-content">
                    <div>
                        <a :href="postUrl" target="__blank" class="is-6 fw-bold mb-0" v-text="post.title"></a>
                    </div>
                    <div>
                        <a :href="userUrl" target="__blank">
                            <small><strong v-text="post.user.name"></strong></small> <small v-text="username"></small>
                        </a>
                        <small>&nbsp;&nbsp;&nbsp;&nbsp;{{ post.published_at | ago }}</small>
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
    import Utils from '../../util';

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

        filters: {
            ago(time) {
                time = moment(time);
                if (moment().diff(time, 'days') > 3) {
                    return time.format("MMMM D YYYY [at] h:mma");
                }

                return time.fromNow();
            }
        },

        computed: {
            username() {
                return '@' + this.post.user.username;
            },

            postUrl() {
                const url = this.post.url || `${EXTENSION_ROOT_URL}/${this.post.user.username}/posts/${this.post.slug}`;

                return Utils.utmUrl(url);
            },

            userUrl() {
                const url = `${EXTENSION_ROOT_URL}/u/${this.post.user.username}`;

                return Utils.utmUrl(url);
            }
        }
    }
</script>
