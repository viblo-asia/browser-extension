<template>
    <div>
        <div v-if="posts.length === 0" class="notification mb-0">
            There are no new posts.
        </div>

        <div class="feed-wrapper">
            <post
                v-for="(post, index) in posts"
                :key="index"
                :post="post"
                :is-new="isNewPost(post)"
            />

            <infinite-loading
                ref="infiniteLoading"
                spinner="spiral"
                @infinite="getNewestPosts"
            />
        </div>

        <div v-if="!loading" class="has-text-right">
            <ext-link :to="newestsPage" :utm="true">
                More articles on Viblo
            </ext-link>
        </div>
    </div>
</template>

<style lang="sass">
    .infinite-status-prompt
        display: none !important
</style>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import { getPostsFeed } from 'viblo-sdk/api/posts';

    import Post from './Post.vue';
    import { WEB_URL, NEW_POSTS } from '../../constants';
    import Notifications from '../../services/Notifications';

    export default {
        components: {
            Post,
            InfiniteLoading
        },

        data() {
            return {
                keys: '',
                posts: [],
                loading: true,
                lastOpen: null,
                newestsPage: WEB_URL,
                feed: 'newest'
            };
        },

        methods: {
            getNewestPosts() {
                getPostsFeed(this.feed)
                    .then((newPosts) => {
                        this.posts = newPosts.data || [];
                        this.loading = false;
                        this.$refs.infiniteLoading.stateChanger.complete();
                    });
            },

            isNewPost(post) {
                if (!this.lastOpen) {
                    return false;
                }

                return post.published_at > this.lastOpen;
            }
        },

        mounted() {
            Notifications.getLastOpen(NEW_POSTS)
                .then((lastOpen) => {
                    this.lastOpen = lastOpen;
                });
        }
    }
</script>
