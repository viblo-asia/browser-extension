<template>
    <div v-show="active" class="tab-pane" role="tabpanel">
        <slot/>
    </div>
</template>

<script>
    export default {
        componentName: 'TabPane',

        props: {
            name: String,
            label: String,
            badge: Number,
            index: Number
        },

        computed: {
            active() {
                return this.$parent.activePane === this.name;
            }
        },

        created() {
            this.$parent.addPane(this);
        },

        destroyed() {
            this.$parent.removePane(this);
        }
    };
</script>
