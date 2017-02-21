<template>
    <div v-show="active"><slot></slot></div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            },

            selected: {
                type: Boolean,
                default: false
            },

            position: {
                type: Number,
                required: true
            }
        },

        data() {
            return {
                active: false
            };
        },

        computed: {
            href() {
                return '#' + this.name.toLowerCase().replace(/ /g, '-');
            }
        },

        mounted() {
            this.active = this.selected;
        }
    }
</script>
