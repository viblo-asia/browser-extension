<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-48x48">
                <img :src="post.user.avatar">
            </p>
        </figure>
        <div class="media-content">
            <h3 class="title is-5 mb-0" v-text="post.title"></h3>
            <div>
                <strong v-text="post.user.name"></strong> <small v-text="username"></small>
                <small>{{ post.published_at | ago }}</small>
            </div>
            <br>
            <div class="control">
                <a class="button is-small is-info">View more</a>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                required: true
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
        }
    }
</script>
