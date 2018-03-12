import Vue from 'vue';
import _ from 'lodash';
import moment from 'moment';

require('./extensions/analytics');

Object.assign(window, {
    _,
    Vue,
    moment
});

export {
    Vue
}
