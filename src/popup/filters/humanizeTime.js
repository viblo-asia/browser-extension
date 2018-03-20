import moment from 'moment';

export default (date, format = 'MMM Mo YYYY, h:mm a', fromFormat = null) => {
    const now = moment();
    const then = fromFormat ? moment(date, fromFormat) : moment(date);

    if (now.diff(then, 'days') < 1) {
        return then.fromNow();
    } else if (now.diff(then, 'days') < 7) {
        return then.format('dddd h:mm a');
    } else if (now.diff(then, 'years') < 1) {
        return then.format('MMM Mo, h:mm a');
    }

    return then.format(format);
};
