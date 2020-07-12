const moment = require('moment')

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')

// 处理成功请求
exports.success = ({ ctx,code = 200, res = null, msg = '请求成功' }) => {
    ctx.body = {
        code: code,
        data: res,
        msg
    }
    ctx.status = 200
}
