<template>
    <div>
        <div class="notification mb-0" v-if="posts.length === 0">
            There are no new posts.
        </div>

        <div class="feed-wrapper">
            <template v-for="post in posts">
                <post :post="post"></post>
            </template>

            <infinite-loading
                spinner="spiral"
                ref="infiniteLoading"
                :on-infinite="getNewestPosts"
            />
        </div>
    </div>
</template>

<style lang="sass">
    .infinite-status-prompt
        display: none !important
</style>

<script>
    import Post from './Post';
    import {API_FEED_NEWEST} from '../../constants';
    import InfiniteLoading from 'vue-infinite-loading';
    import {localStorage} from '../../storage/ChromeStorage';

    export default {
        data() {
            return {
                keys: '',
                posts: [],
                nextPageUrl: API_FEED_NEWEST
            };
        },

        components: {
            Post,
            InfiniteLoading
        },

        methods: {
            getNewestPosts() {
                axios.get(this.nextPageUrl, {params: {keys: this.keys}})
                    .then(({data}) => {
                        let {paginator} = data.data;
                        let posts = this.posts;
                        this.posts = _.concat(posts, paginator.data);

                        let nextPageUrl = paginator.next_page_url;
                        if (nextPageUrl) {
                            this.nextPageUrl = nextPageUrl;
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                        } else {
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                        }
                    });
            }
        },

        created() {
            localStorage.find('feedNewest', (keys) => {
                this.keys = (keys && Array.isArray(keys)) ? keys.join(',') : '';
            });
        }
    }
</script>
