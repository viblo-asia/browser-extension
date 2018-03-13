<template>
    <scrollbar class="v-scrollbar" wrap-class="v-scrollbar__wrap">
        <slot/>
    </scrollbar>
</template>

<script>
    import Scrollbar from 'element-ui/lib/scrollbar';

    export default {
        components: {
            Scrollbar
        }
    };
</script>

<style lang="scss">
    .v-scrollbar {
        .v-scrollbar__wrap {
            max-height: 380px;
        }
    }
</style>
