import Vue from 'vue';

import Alert from 'element-ui/lib/alert';
import Input from 'element-ui/lib/input';
import Button from 'element-ui/lib/button';
import Switch from 'element-ui/lib/switch';
import Radio from 'element-ui/lib/radio';
import RadioButton from 'element-ui/lib/radio-button';
import RadioGroup from 'element-ui/lib/radio-group';
import Scrollbar from '~/popup/components/commons/Scrollbar.vue';

export default function () {
    Vue.component('el-alert', Alert);
    Vue.component('el-input', Input);
    Vue.component('el-button', Button);
    Vue.component('el-switch', Switch);
    Vue.component('el-radio', Radio);
    Vue.component('el-radio-button', RadioButton);
    Vue.component('el-radio-group', RadioGroup);
    Vue.component('el-scrollbar', Scrollbar);
}
