<template>
    <div>
        <div class="tabs is-right is-small is-boxed">
            <ul>
                <li
                    v-for="(allowedFeed, index) in allowedFeeds"
                    :key="index"
                    :class="{'is-active': feed === allowedFeed}"
                    @click="activeFeed(allowedFeed)"
                >
                    <a>{{ ucfirst(allowedFeed) }}</a>
                </li>
            </ul>
        </div>
        <div v-if="questions.length === 0" class="notification mb-0">
            There are no new questions.
        </div>

        <div class="feed-wrapper">
            <question
                v-for="(question, index) in questions"
                :key="index"
                :question="question"
                :is-new="isNewQuestion(question)"
            />

            <infinite-loading
                ref="infiniteLoading"
                spinner="spiral"
                @infinite="getNewestQuestions"
            />
        </div>

        <div v-if="!loading" class="has-text-right">
            <ext-link :to="newestsPage" :utm="true">
                More questions on Viblo
            </ext-link>
        </div>
    </div>
</template>

<style lang="sass">
    .infinite-status-prompt
        display: none !important
</style>

<script>
    import _upperFirst from 'lodash/upperFirst';
    import { WEB_URL, NEW_POSTS } from '~/constants';
    import Notifications from '~/services/Notifications';
    import { getQuestionsFeed } from 'viblo-sdk/api/questions';

    import InfiniteLoading from 'vue-infinite-loading';
    import Question from './Question.vue';

    export default {

        components: {
            Question,
            InfiniteLoading
        },
        data() {
            return {
                keys: '',
                questions: [],
                loading: true,
                lastOpen: null,
                newestsPage: `${WEB_URL}/questions`,
                feed: 'newest',
                allowedFeeds: ['newest', 'unanswered', 'unsolved']
            };
        },

        mounted() {
            Notifications.getLastOpen(NEW_POSTS)
                .then((lastOpen) => {
                    this.lastOpen = lastOpen;
                });

            this.getNewestQuestions();
        },

        methods: {
            getNewestQuestions() {
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

            ucfirst(val) {
                return _upperFirst(val);
            },

            isNewQuestion(question) {
                if (!this.lastOpen) {
                    return false;
                }

                return question.published_at > this.lastOpen;
            }
        }
    };
</script>
