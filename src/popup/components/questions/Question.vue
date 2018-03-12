<template>
    <div :class="{highlighted: isNew}" class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <avatar
                        :images="user.avatar"
                        :username="user.username"
                        class-name="is-md-avatar"
                    />
                </div>

                <div class="media-content">
                    <ext-link
                        :to="toQuestion(question)"
                        :utm="true"
                        class-name="is-6 fw-bold mb-0"
                    >
                        {{ question.title }} <small>&#x2714; {{ question.answers_count }}</small>
                    </ext-link>
                    <div>
                        <ext-link :to="toUser(user)" :utm="true">
                            <small><strong v-text="user.name"/></small>
                            <small>@{{ user.username }}</small>
                        </ext-link>
                        <small>&nbsp;&nbsp;&nbsp;&nbsp;{{ question.created_at | humanize-time }}</small>

                    </div>
                    <div>
                        <small>
                            <i class="fa fa-eye"/>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="sass">
    .card
        &.highlighted
            background-color: rgba(75, 205, 159, .15)

            &:hover
                background-color: rgba(75, 205, 159, .35)
</style>

<script>
    import { toQuestion, toUser } from '~/utils/url';
    import Avatar from '../commons/Avatar.vue';
    import humanizeTime from '../../filters/humanizeTime';

    export default {
        components: {
            Avatar
        },

        filters: {
            humanizeTime
        },

        props: {
            question: {
                type: Object,
                required: true
            },

            'is-new': {
                type: Boolean,
                default: false
            }
        },

        computed: {
            user() {
                return this.question.user.data;
            }
        },

        methods: {
            toQuestion,
            toUser
        }
    };
</script>
