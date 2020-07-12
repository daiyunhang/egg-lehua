const Service = require('egg').Service;
const crypto = require('crypto');

class Login extends Service {
    async index(username) {
        const { ctx } = this
        // return await ctx.model.User.findOne({
        //     where: {
        //         username: username,
        //     },
        //     include: {
        //         as: "Role",
        //         model: ctx.model.Role,
        //     }
        // });
        return await ctx.model.User.findOne({ username });
    }

    async register(username, pwd) {
        const { ctx } = this;
        const password = this.getMd5Data(pwd);
        await ctx.model.User.create({ username, password });
    }

    // 专门对数据进行md5加密的方法，输入明文返回密文
    getMd5Data(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}

module.exports = Login;
