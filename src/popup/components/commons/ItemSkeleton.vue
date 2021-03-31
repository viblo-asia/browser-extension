<template>
    <div class="item">
        <div class="item__icon">
            <skeleton circle height="100%" />
        </div>

        <div class="item__content">
            <skeleton :count="count" />
        </div>
    </div>
</template>

<script>
    import { Skeleton } from 'vue-loading-skeleton';

    export default {
        components: {
            Skeleton
        },

        props: {
            count: {
                type: Number,
                default: 2
            }
        }
    };
</script>

<style lang="scss">
    .item {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: .5em 0;
        border-bottom: 1px solid #f0f0f0;

        &__icon {
            width: 40px;
            height: 40px;
            margin-right: 1rem;
            margin-left: .5rem;
        }

        &__content {
            flex: 1;
        }
    }
</style>
