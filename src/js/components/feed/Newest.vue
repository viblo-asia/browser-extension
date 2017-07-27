<template>
    <div>
        <div class="notification mb-0" v-if="posts.length === 0">
            There are no new posts.
        </div>

        <div class="feed-wrapper">
            <post v-for="(post, index) in posts" :key="index" :post="post" :is-new="isNewPost(post)"></post>

            <infinite-loading
                spinner="spiral"
                ref="infiniteLoading"
                :on-infinite="getNewestPosts"
            />
        </div>

        <div v-if="!loading" class="has-text-right">
            <ext-link :to="newestsPage" :utm="true">More articles on Viblo</ext-link>
        </div>
    </div>
</template>

<style lang="sass">
    .infinite-status-prompt
        display: none !important
</style>

<script>
    import Post from './Post';
    import InfiniteLoading from 'vue-infinite-loading';
    import api from '../../api';
    import Notifications from '../../services/Notifications';
    import {ROOT_URL, NEW_POSTS} from '../../constants';

    export default {
        data() {
            return {
                keys: '',
                posts: [],
                loading: true,
                lastOpen: null,
                newestsPage: ROOT_URL
            };
        },

        components: {
            Post,
            InfiniteLoading
        },

        mounted() {
            Notifications.getLastOpen(NEW_POSTS)
                .then((lastOpen) => {
                    this.lastOpen = lastOpen;
                });
        },

        methods: {
            getNewestPosts() {
                api.getNewestPosts()
                    .then((newPosts) => {
                        this.posts = newPosts.data || [];
                        this.loading = false;
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    });
            },

            isNewPost(post) {
                if (!this.lastOpen) {
                    return false;
                }

                return post.published_at > this.lastOpen;
            }
        },
    }
</script>
