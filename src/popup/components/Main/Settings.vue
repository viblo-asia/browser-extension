<template>
    <el-scrollbar class="settings">
        <section v-if="!authenticated" class="mb-05">
            <h3>Login</h3>
            <login/>
        </section>

        <section class="mb-05">
            <h3>Badges & Notifications</h3>

            <el-switch
                v-model="options.notifyNewPosts"
                active-text="New posts notifications"
                active-color="#13ce66"
                class="mb-05"
            />

            <el-alert title="" class="mb-05">
                Receive notification when a new post is published
            </el-alert>

            <label class="label">
                Badge counter type
            </label>

            <el-radio-group v-model="options.badgeType" class="mb-05">
                <el-radio label="all">All</el-radio>
                <el-radio label="unreadNotifications">Unread Notifications</el-radio>
                <el-radio label="newPosts">New Posts</el-radio>
            </el-radio-group>

            <el-alert title="" type="info" class="mb-05">
                You may configure the information which will be displayed on the extension bagde.
            </el-alert>

            <el-button type="primary" size="mini" @click="onSubmit">Save</el-button>
        </section>

        <section v-if="authenticated" class="mb-05">
            <h3>Logout</h3>
            <logout/>
        </section>
    </el-scrollbar>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Login from '../auth/Login.vue';
    import Logout from '../auth/Logout.vue';

    export default {
        components: {
            Login,
            Logout
        },

        data: () => ({
            form: {}
        }),

        computed: {
            ...mapGetters({
                options: 'options/all',
                authenticated: 'authenticated'
            })
        },

        watch: {
            options(newValue) {
                this.form = newValue;
            }
        },

        mounted() {
            this.fetchStoredOptions();
        },

        methods: {
            ...mapActions('options', ['fetchStoredOptions', 'updateOptions']),

            onSubmit() {
                return this.updateOptions(this.options).then(this.reloadConfig);
            },

            reloadConfig() {
                chrome.runtime.reload();
            }
        }
    };
</script>
