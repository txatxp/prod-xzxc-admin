const moment = require('moment');
moment.locale('en', {
    weekdays : [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "星期五", "Saturday"
    ]
});
exports.relativeTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');
