<template>
    <div>
        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li v-for="tab in orderedTabs" class="tab" :class="{ 'is-active': tab.active }">
                    <a href="#" @click.prevent="selectTab(tab)">
                        {{ tab.name }}
                        <span v-if="tab.badge > 0" class="tab-badge">{{ tab.badge }}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="sass">
    .tab
        .tab-badge
            border-radius: 3px
            margin-left: 5px
            padding: 0 5px
            font-size: 0.9rem
            font-weight: bold
            background-color: #f25f43
            color: #FFF

        &.is-active
            .tab-badge
                background-color: #FFF
                color: #f25f43

</style>

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

        computed: {
            orderedTabs() {
                return _.orderBy(this.tabs, (tab) => tab.position);
            }
        },

        methods: {
            selectTab(selectedTab) {
                this.tabs.forEach(tab => {
                    if (tab.id == selectedTab.id) {
                        tab.active = true;
                        tab.$emit('selected');
                    } else {
                        if (tab.active) {
                            tab.$emit('leave');
                        }

                        tab.active = false;
                    }
                });
            }
        }
    }
</script>
