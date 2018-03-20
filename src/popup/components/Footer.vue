<template>
    <footer id="footer">
        <ext-link :to="storePage" class="rate">
            <span>If you like Viblo's News Feed, please </span>
            <span class="text-primary">rate us!</span>
        </ext-link>
    </footer>
</template>

<script>
    import { storePage } from '~/config';

    export default {
        data: () => ({
            storePage
        })
    };
</script>

<style lang="scss">
    #footer {
        padding: 5px;
        text-align: center;
        background-color: #f5f5f5;

        .rate {
            font-size: 0.9rem;
            color: #888;
        }
    }
</style>

