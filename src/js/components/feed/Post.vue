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
                        <a @click.prevent="openUrl(postUrl)" :href="utmUrl(postUrl)" class="is-6 fw-bold mb-0" v-text="post.title"></a>
                    </div>
                    <div>
                        <a @click.prevent="openUrl(userUrl)" :href="utmUrl(userUrl)">
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
    import utils from '../../util';
    import Tab from '../../services/Tab';

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

        data() {
            return {
                postUrl: utils.postUrl(this.post),
                userUrl: utils.userUrl(this.post.user)
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
            }
        },

        methods: {
            utmUrl(url) {
                return utils.utmUrl(url)
            },

            openUrl(url) {
                Tab.create(url);
            }
        }
    }
</script>
