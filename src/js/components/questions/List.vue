<template>
    <div>
        <div class="tabs is-right is-small is-boxed">
            <ul>
                <li v-for="allowedFeed in allowedFeeds" @click="activeFeed(allowedFeed)" :class="{'is-active': feed === allowedFeed}"><a>{{ ucfirst(allowedFeed) }}</a></li>
            </ul>
        </div>
        <div class="notification mb-0" v-if="questions.length === 0">
            There are no new questions.
        </div>

        <div class="feed-wrapper">
            <question v-for="(question, index) in questions" :key="index" :question="question" :is-new="isNewQuestion(question)"></question>

            <infinite-loading
                spinner="spiral"
                ref="infiniteLoading"
                :on-infinite="getNewestQuestions"
            />
        </div>

        <div v-if="!loading" class="has-text-right">
            <ext-link :to="newestsPage" :utm="true">More questions on Viblo</ext-link>
        </div>
    </div>
</template>

<style lang="sass">
    .infinite-status-prompt
        display: none !important
</style>

<script>
    import Question from './Question';
    import InfiniteLoading from 'vue-infinite-loading';
    import api from '../../api';
    import Notifications from '../../services/Notifications';
    import {ROOT_URL, NEW_POSTS} from '../../constants';
    import _upperFirst from 'lodash/upperFirst';

    export default {
        data() {
            return {
                keys: '',
                questions: [],
                loading: true,
                lastOpen: null,
                newestsPage: ROOT_URL + '/questions',
                feed: 'newest',
                allowedFeeds: ['newest', 'unanswered', 'unsolved'],
            };
        },

        components: {
            Question,
            InfiniteLoading
        },

        mounted() {
            Notifications.getLastOpen(NEW_POSTS)
                .then((lastOpen) => {
                    this.lastOpen = lastOpen;
                });
            this.getNewestQuestions()
        },

        methods: {
            getNewestQuestions() {
                api.getQuestions(this.feed)
                    .then((newQuestions) => {
                        this.questions = newQuestions.data || [];
                        this.loading = false;
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    });
            },

            activeFeed (feed) {
                this.feed = feed
                this.getNewestQuestions()
            },

            ucfirst (val) {
                return _upperFirst(val)
            },

            isNewQuestion(question) {
                if (!this.lastOpen) {
                    return false;
                }

                return question.published_at > this.lastOpen;
            }
        },
    }
</script>
