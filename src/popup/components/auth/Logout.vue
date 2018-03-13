<template>
    <el-alert title="" type="warning">
        <p>
            After logging out, you will no longer receive your notifications related to your account on Viblo.
            However, you'll still receive notifications about newly published posts.
        </p>
        <el-button type="danger" size="mini" @click="doLogout">Logout</el-button>
    </el-alert>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions(['logout']),

            doLogout() {
                return this.logout().then(() => {
                    chrome.runtime.reload();
                });
            }
        }
    };
</script>

