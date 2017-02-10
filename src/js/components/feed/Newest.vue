<template>
    <div>
        <div class="notification is-info mb-0" v-if="posts.length === 0">
            There are no new posts. Check back later.
        </div>

        <div class="feed-wrapper">
            <template v-for="post in posts">
                <post :post="post"></post>
            </template>
        </div>
    </div>
</template>

<script>
    import Post from './Post';
    import {FEED_NEWEST_API} from '../../constants';

    export default {
        data() {
            return {
                posts: []
            };
        },

        components: {
            Post
        },

        methods: {
            getNewestPosts() {
                axios.get(FEED_NEWEST_API)
                    .then(({data}) => this.posts = data.data);
            }
        },

        created() {
            this.getNewestPosts();
        },

        mounted() {
            // TODO: update user last visit time
        }
    }
</script>
