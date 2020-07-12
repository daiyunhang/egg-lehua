const Service = require('egg').Service;
const crypto = require('crypto');

class User extends Service {
    async index() {
        const { ctx } = this
        return await ctx.model.User.findAll();
    }

    async editPwd(id, pwd) {
        const { ctx } = this
        const user = await ctx.model.User.findByPk(id)
        const password = this.getMd5Data(pwd);
        await user.update({ password: password });
    }

    async editUser(id, phone, nickname, imgUrl) {
        const { ctx } = this
        const user = await ctx.model.User.findByPk(id)
        await user.update({ phone: phone, nickname: nickname, imgUrl: imgUrl });
    }
    // 专门对数据进行md5加密的方法，输入明文返回密文
    getMd5Data(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}

module.exports = User;
