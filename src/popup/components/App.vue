<template>
    <div id="app" class="popup">
        <popup-header/>
        <popup-main/>
        <popup-footer/>
    </div>
</template>

<script>
    import PopupHeader from './Header.vue';
    import PopupFooter from './Footer.vue';
    import PopupMain from './Main/index.vue';

    export default {
        components: {
            PopupHeader,
            PopupMain,
            PopupFooter
        }
    };
</script>
