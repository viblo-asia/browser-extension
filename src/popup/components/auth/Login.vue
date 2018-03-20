<template>
    <section class="section py-0">
        <div class="control mb-05">
            <el-input
                v-model="form.oauthToken"
                size="small"
                type="password"
                name="oauthToken"
                placeholder="Paste your private API token here..."
                @keydown.native.enter.prevent="login"
            />

            <el-alert
                v-if="state.logInError"
                title=""
                type="error"
                class="mt-05"
            >
                Cannot log in with the provided API key. Please review your API key.
                Click "Show Guide" below if you need help.
            </el-alert>


        </div>

        <div class="control d-flex justify-content-between">
            <el-button type="primary" size="mini" @click.prevent="login">Login</el-button>
            <el-switch v-model="showGuides" active-text="Show Guide" active-color="#13ce66"/>
        </div>

        <el-alert
            v-show="showGuides"
            title=""
            type="info"
            class="mt-05"
        >
            <ol>
                <li>
                    Head to <ext-link to="https://viblo.asia/settings/oauth">
                    <strong class="text-primary">API keys</strong></ext-link> for your Viblo account.
                </li>
                <li>
                    Click <strong class="text-primary">New API key</strong> button on the
                    <strong class="text-primary">API keys</strong> panel,
                    and specify a name for your API key.
                </li>
                <li>
                    Copy the generated API key and paste it in the below form.
                    Note that this key is only visible once.
                </li>
            </ol>
        </el-alert>
    </section>
</template>

<script>
    import { mapActions } from 'vuex';
    import { validateToken } from '~/utils/api';

    export default {
        data() {
            return {
                showGuides: false,
                guideText: 'Show Guides',
                form: {
                    oauthToken: ''
                },
                state: {
                    processing: false,
                    logInError: false
                }
            };
        },

        methods: {
            ...mapActions(['storeAuthToken']),

            toggleGuides() {
                this.showGuides = !this.showGuides;
                this.guideText = this.showGuides ? 'Hide Guides' : 'Show Guides';
            },

            async login() {
                const token = this.form.oauthToken;

                if (!token || this.state.processing) {
                    return;
                }

                this.state.processing = true;

                const validToken = await validateToken(token);
                if (validToken) {
                    this.storeAuthToken(token);
                    chrome.runtime.reload();
                } else {
                    this.state.logInError = true;
                    this.state.processing = false;
                }
            }
        }
    };
</script>
