<template>
    <div>
        <div class="questions__feed-type">
            <el-radio-group v-model="feed" size="mini" class="questions__feed-type__select">
                <el-radio-button label="newest">Newest</el-radio-button>
                <el-radio-button label="unsolved">Unsolved</el-radio-button>
            </el-radio-group>
        </div>

        <div v-if="questions.length === 0 && !loading" class="notification mb-0">
            There are no new questions.
        </div>

        <el-scrollbar>
            <item
                v-for="(question, index) in questions"
                :key="index"
                :url="toQuestion(question)"
                :user="question.user.data"
                :time="question.created_at"
                :highlight="isNewQuestion(question)"
            >
                {{ question.title }}

                <div slot="extra-info" :class="{ 'text-green': question.solved }" class="text-muted">
                    <template v-if="question.solved">&#x2714;</template>
                    {{ question.answers_count }} answers
                </div>
            </item>

            <infinite-loading
                ref="infiniteLoading"
                spinner="spiral"
                @infinite="getNewestQuestions"
            />
        </el-scrollbar>
    </div>
</template>

<script>
    import moment from 'moment';
    import { TabTypes } from '~/utils/enums';
    import { toQuestion } from '~/utils/url';
    import { getLastOpen } from '~/storage/lastOpen';
    import { getQuestionsFeed } from 'viblo-sdk/api/questions';
    import InfiniteLoading from 'vue-infinite-loading';

    import Item from '../commons/Item.vue';

    export default {

        components: {
            Item,
            InfiniteLoading
        },

        data() {
            return {
                questions: [],
                loading: true,
                lastOpen: null,
                feed: 'newest'
            };
        },

        computed: {
            lastOpenMoment() {
                return moment(this.lastOpen);
            }
        },

        watch: {
            feed() {
                this.getNewestQuestions();
            }
        },

        beforeCreate() {
            getLastOpen(TabTypes.NewQuestions).then((time) => {
                this.lastOpen = time;
            });
        },

        mounted() {
            this.getNewestQuestions();
        },

        methods: {
            toQuestion,

            getNewestQuestions() {
                this.loading = true;
                getQuestionsFeed(this.feed)
                    .then((questions) => {
                        this.questions = questions.data || [];
                        this.loading = false;
                        this.$refs.infiniteLoading.stateChanger.complete();
                    });
            },

            activeFeed(feed) {
                this.feed = feed;
                this.getNewestQuestions();
            },

            isNewQuestion(question) {
                return this.lastOpenMoment < moment(question.created_at);
            }
        }
    };
</script>

<style lang="scss">
    .questions {
        &__feed-type {
            display: flex;
            justify-content: flex-end;
            margin-bottom: .5rem;
            margin-top: -.5rem;
        }
    }
</style>

