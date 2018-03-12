<template>
    <div v-show="active"><slot></slot></div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },

            badge: {
                type: Number,
                default: 0
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

        mounted() {
            this.active = this.selected;
        }
    }
</script>
