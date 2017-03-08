<template>
    <div>
        <div class="notification mb-0" v-if="posts.length === 0">
            There are no new posts.
        </div>

        <div class="feed-wrapper">
            <template v-for="post in posts">
                <post :post="post" :is-new="isNewPost(post)"></post>
            </template>

            <infinite-loading
                spinner="spiral"
                ref="infiniteLoading"
                :on-infinite="getNewestPosts"
            />
        </div>

        <div v-if="!loading" class="has-text-centered">
            <a style="margin:5px;padding:15px" class="button is-primary" @click.prevent="newestsPage">See More</a>
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
    import Notifications, {NEW_POSTS} from '../../services/Notifications';
    import {ROOT_URL} from '../../constants';
    import Tab from '../../services/Tab';

    export default {
        data() {
            return {
                keys: '',
                posts: [],
                loading: true,
                lastOpen: null
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
                        this.posts = newPosts || [];
                        this.loading = false;
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    });
            },

            isNewPost(post) {
                if (!this.lastOpen) {
                    return false;
                }

                return post.published_at > this.lastOpen;
            },

            newestsPage() {
                Tab.create(ROOT_URL);
            }
        },
    }
</script>
