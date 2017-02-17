<template>
    <section class="section pt-0">
        <form @submit.prevent="onSubmit">
            <div class="control">
                <label for="oauthToken" class="label">API Token</label>
                <input
                    type="password"
                    id="oauthToken"
                    name="oauthToken"
                    class="input"
                    v-model="form.oauthToken"
                    placeholder="Paste your private API token here..."
                    required
                >
                <span class="help is-info">
                    <a href="#" v-text="guideText" @click.prevent="toggleGuides"></a>
                </span>
            </div>

            <div class="control">
                <button class="button is-primary" type="submit">Login</button>
            </div>
        </form>

        <div class="content small-text mt-05" v-if="showGuides">
            <ul>
                <li>
                    Head to <a href="https://viblo.asia/settings/oauth" target="_blank">
                    <strong class="color-primary">OAuth Preference</strong></a> for your Viblo account.
                </li>
                <li>
                    Click <strong class="color-primary">Create New Token</strong> button on the
                    <strong class="color-primary">Personal Access Tokens</strong> panel, and specify a name for your token.</li>
                <li>Copy the generated token and paste it in the below form. Note that this token is only visible once.</li>
            </ul>
        </div>
    </section>
</template>

<script>
    import {syncedStorage} from '../../storage/ChromeStorage';

    export default {
        data() {
            return {
                showGuides: false,
                guideText: 'Show Guides',
                form: {
                    oauthToken: '',
                }
            };
        },

        methods: {
            toggleGuides() {
                this.showGuides = !this.showGuides;
                this.guideText = this.showGuides ? 'Hide Guides' : 'Show Guides';
            },

            onSubmit() {
                let token = this.form.oauthToken;
                let regex = new RegExp("^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$");

                if (regex.test(token)) {
                    token = 'Bearer ' + token;
                    let data = {
                        authenticated: true,
                        oauthToken: token,
                        options: {
                            badgeTextType: 'all',
                            newPostNotification: true
                        }
                    };
                    syncedStorage.set(data, () => chrome.runtime.reload());
                }
            }
        }
    }
</script>
