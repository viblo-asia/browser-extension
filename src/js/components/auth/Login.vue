<template>
    <div>
        <section class="hero is-dark" v-once>
            <div class="hero-body">
                <div class="container">
                    <a href="https://viblo.asia" target="__blank">
                        <h1 class="title color-primary">VIBLO</h1>
                    </a>
                    <h2 class="subtitle">Free service for technical knowledge sharing.</h2>

                    <div class="content color-white">
                        <p>To use this extension, please following the following steps:</p>
                        <ul>
                            <li>Head to <a href="https://viblo.asia/settings/oauth" target="_blank"><strong class="color-primary">OAuth Preferences Page</strong></a> for your Viblo account.</li>
                            <li>
                                Click <strong class="color-primary">Create New Token</strong> button on the
                                <strong class="color-primary">Personal Access Tokens</strong> panel, and specify a name for your token.</li>
                            <li>Copy the generated token and paste it in the below form. Note that this token is only visible once.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <div class="box">
            <form @submit.prevent="onSubmit">
                <div class="control">
                    <label for="oauthToken" class="label">Private API Token</label>

                    <input type="password" id="oauthToken" name="oauthToken" class="input" v-model="form.oauthToken" required>
                </div>

                <div class="control">
                    <button class="button is-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Form from '../../services/Form';
    import Storage from '../../storage/ChromeSyncStorage';

    export default {
        data() {
            return {
                form: new Form({
                    oauthToken: '',
                })
            };
        },

        methods: {
            onSubmit() {
                let storage = new Storage();
                let token = this.form.data().oauthToken;
                let regex = new RegExp("^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$");

                if (regex.test(token)) {
                    token = 'Bearer ' + token;
                    storage.set({'oauthToken': token}, () => chrome.runtime.reload());
                }
            }
        }
    }
</script>
