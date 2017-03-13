<template>
    <div>
        <login v-if="!authenticated"></login>

        <section class="section pt-0" v-if="authenticated">
            <button @click="logout" class="button is-danger">Logout</button>
            <div class="notification is-warning small-text mt-05">
                After logging out, you will no longer receive your notifications related to your account on Viblo.
                However, you'll still receive notifications about newly published posts.
            </div>
        </section>

        <section class="section pb-0">
            <form @submit.prevent="onSubmit">
                <div class="control">
                    <label class="checkbox">
                        <input type="checkbox" v-model="form.newPostNotification">
                        <strong>Receive Notifications about Newly Published Posts</strong>
                    </label>

                    <div class="notification small-text mt-05">
                        You will receive notifications anytime an author publishes new posts on Viblo. You may turn on/off this option here.
                    </div>
                </div>

                <div class="control" v-if="this.authenticated">
                    <label class="label"><strong>Badge counter type</strong></label>

                    <label class="radio">
                        <input type="radio" value="all" v-model="form.badgeTextType">
                        <span>All</span>
                    </label>

                    <label class="radio">
                        <input type="radio" value="unreadNotifications" v-model="form.badgeTextType">
                        <span>Unread Notifications</span>
                    </label>

                    <label class="radio">
                        <input :disabled="!this.form.newPostNotification" type="radio" value="newPosts" v-model="form.badgeTextType">
                        <span>New Posts</span>
                    </label>

                    <div class="notification small-text mt-05">
                        You may configure the information which will be displayed on the extension bagde.
                    </div>
                </div>

                <div class="control">
                    <button class="button is-primary" type="submit">Save</button>
                </div>
            </form>
        </section>
    </div>
</template>

<style lang="sass">
    .section
        padding: 1.5em 0
</style>

<script>
    import Login from './auth/Login.vue';
    import {syncedStorage} from '../storage/ChromeStorage';

    export default {
        props: {
            authenticated: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                form: {
                    badgeTextType: 'newPosts',
                    newPostNotification: true
                }
            };
        },

        components: {
            Login
        },

        created() {
            syncedStorage.find('options', (options) => {
                if (options) {
                    this.form = Object.assign({}, this.form, options);
                }
            });
        },

        methods: {
            onSubmit() {
                let data = { options: this.form };
                syncedStorage.set(data, () => chrome.runtime.reload());
            },

            logout() {
                let data = {
                    authenticated: false,
                    oauthToken: '',
                    options: {
                        badgeTextType: 'newPosts',
                        newPostNotification: true
                    }
                };
                syncedStorage.set(data, () => chrome.runtime.reload());
            }
        }
    }
</script>
