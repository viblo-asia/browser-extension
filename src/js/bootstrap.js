import Vue from 'vue';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

if (EXTENSION_ENV === 'production') {
    require('./extensions/analytics');
}

Object.assign(window, {
    _,
    Vue,
    axios,
    moment
});

export {
    Vue
}
