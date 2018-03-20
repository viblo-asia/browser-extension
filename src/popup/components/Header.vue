<template>
    <header id="header">
        <ext-link to="https://viblo.asia" tabindex="-1">
            <div class="hero">
                <div>
                    <h1 class="title">
                        <img :src="icon" class="logo">
                        <span>iblo's News Feed</span>
                    </h1>
                    <h3 class="subtitle">Free service for technical knowledge sharing.</h3>
                </div>

                <avatar
                    v-if="user"
                    :username="user.username"
                    :images="user.avatar"
                />
            </div>
        </ext-link>
    </header>
</template>

<script>
    import { mapState } from 'vuex';
    import Avatar from './commons/Avatar.vue';

    export default {
        components: {
            Avatar
        },

        computed: {
            ...mapState(['user']),

            icon() {
                return chrome.extension.getURL('images/icon64.png');
            }
        }
    };
</script>

<style lang="scss">
    #header {
        padding: 1em;
        padding-bottom: 0;

        .title {
            display: flex;
            margin-bottom: .25rem;

            .logo {
                height: 25px;
            }

            span {
                font-size: 1.5rem;
                line-height: 25px;
                color: #6b717b;
            }
        }

        .subtitle {
            color: #4a4a4a;
        }

        .hero {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto;


            .avatar > img {
                border: 2px solid #4bcd9f;
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 100%;
                max-width: 3.75rem;
                max-height: 3.75rem;
                margin: 0 auto;
            }
        }
    }
</style>

