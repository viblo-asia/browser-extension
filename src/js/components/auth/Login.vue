<template>
    <section class="section pt-0 pb-0">
        <form>
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

                <span v-if="state.logInError" class="mt-05 help is-danger">Cannot log in with the provided API key. Please review your API key. Click "Show guides" below if you need help.</span>

                <span class="help is-info">
                    <a href="#" v-text="guideText" @click.prevent="toggleGuides"></a>
                </span>
            </div>

            <div class="control">
                <button class="button is-primary" @click.prevent="login">Login</button>
            </div>
        </form>


        <div class="content small-text mt-05" v-if="showGuides">
            <ul>
                <li>
                    Head to <a href="https://viblo.asia/settings/oauth" target="_blank">
                    <strong class="color-primary">API keys</strong></a> for your Viblo account.
                </li>
                <li>
                    Click <strong class="color-primary">New API key</strong> button on the
                    <strong class="color-primary">API keys</strong> panel, and specify a name for your API key.</li>
                <li>Copy the generated API key and paste it in the below form. Note that this key is only visible once.</li>
            </ul>
        </div>
    </section>
</template>

<script>
    import Auth from '../../services/Auth';
    import EventBus from '../EventBus';

    export default {
        data() {
            return {
                showGuides: false,
                guideText: 'Show Guides',
                form: {
                    oauthToken: '',
                },
                state: {
                    processing: false,
                    logInError: false
                }
            };
        },

        methods: {
            toggleGuides() {
                this.showGuides = !this.showGuides;
                this.guideText = this.showGuides ? 'Hide Guides' : 'Show Guides';
            },

            login() {
                const oauthToken = this.form.oauthToken;

                if (!oauthToken || this.state.processing) {
                    return;
                }

                this.state.processing = true;

                Auth.login(oauthToken)
                    .then((user) => {
                        chrome.runtime.reload();
                        EventBus.$emit('logged-in', user);
                    }).catch(() => {
                        this.state.logInError = true;
                    }).then(() => {
                        this.state.processing = false;
                    });
            }
        }
    }
</script>
