<template>
    <div>
        <div class="notification mb-0" v-if="posts.length === 0">
            There are no new posts.
        </div>

        <div class="feed-wrapper">
            <template v-for="post in posts">
                <post :post="post" :is-new="isNewPost(post.slug)"></post>
            </template>

            <infinite-loading
                spinner="spiral"
                ref="infiniteLoading"
                :on-infinite="getNewestPosts"
            />
        </div>

        <div v-if="!loading" class="has-text-centered">
            <a style="margin:5px;padding:15px" class="button is-primary" :href="rootUrl" target="__blank">See More</a>
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
    import NewPosts from '../../services/NewPosts';
    import {ROOT_URL} from '../../constants';

    export default {
        data() {
            return {
                keys: '',
                posts: [],
                loading: true,
                newPosts: [],
                rootUrl: ROOT_URL
            };
        },

        components: {
            Post,
            InfiniteLoading
        },

        mounted() {
            NewPosts.get()
                .then((newPosts) => {
                    this.newPosts = newPosts;
                });
        },

        methods: {
            getNewestPosts() {
                api.getNewestPosts()
                    .then((newPosts) => {
                        this.posts = newPosts || [];
                        this.loading = false;
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    });
            },

            isNewPost(key) {
                return this.newPosts.includes(key);
            }
        },
    }
</script>
