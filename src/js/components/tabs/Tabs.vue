<template>
    <div>
        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.active }">
                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                </li>
            </ul>
        </div>
        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabs: []
            };
        },

        created() {
            this.tabs = this.$children;
        },

        methods: {
            selectTab(selectedTab) {
                this.tabs.forEach(tab => tab.active = (tab.href == selectedTab.href));
            }
        }
    }
</script>
