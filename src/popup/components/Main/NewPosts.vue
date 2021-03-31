<template>
    <div>
        <div v-if="posts.length === 0 && !loading" class="notification mb-0">
            There are no new posts.
        </div>

        <el-scrollbar>
            <template v-if="posts.length === 0 && loading">
                <item-skeleton v-for="index in 8" :key="index" />
            </template>

            <item
                v-for="(post, index) in posts"
                :key="index"
                :url="postUrl(post)"
                :user="post.user.data"
                :time="post.published_at"
                :highlight="isNewPost(post)"
            >
                {{ post.title }}
            </item>

            <infinite-loading
                ref="infiniteLoading"
                spinner="spiral"
                @infinite="getNewestPosts"
            />
        </el-scrollbar>
    </div>
</template>

<script>
    import moment from 'moment';
    import { toPost } from '~/utils/url';
    import { TabTypes } from '~/utils/enums';
    import { getLastOpen } from '~/storage/lastOpen';
    import InfiniteLoading from 'vue-infinite-loading';
    import { getPostsFeed, PostFeedType } from 'viblo-sdk/api/posts';

    import Item from '../commons/Item.vue';
    import ItemSkeleton from '../commons/ItemSkeleton.vue';

    export default {
        components: {
            Item,
            ItemSkeleton,
            InfiniteLoading
        },

        data() {
            return {
                posts: [],
                loading: true,
                lastOpen: null
            };
        },

        computed: {
            lastOpenMoment() {
                return moment(this.lastOpen);
            }
        },

        beforeCreate() {
            getLastOpen(TabTypes.NewPosts).then((time) => {
                this.lastOpen = time;
            });
        },

        methods: {
            postUrl: toPost,

            getNewestPosts() {
                getPostsFeed(PostFeedType.Newest)
                    .then((newPosts) => {
                        this.posts = newPosts.data || [];
                        this.loading = false;
                        this.$refs.infiniteLoading.stateChanger.complete();
                    });
            },

            isNewPost(post) {
                return this.lastOpenMoment < moment(post.published_at);
            }
        }
    };
</script>
