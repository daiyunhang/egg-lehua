'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const crypto = require('crypto');

class LoginController extends Controller {

    // 注册
    async register() {
        const { ctx } = this;
        const { username, pwd } = ctx.request.body || {};
        if (username && pwd) {
            const password = this.getMd5Data(pwd)
            await ctx.service.login.register(username, password);
            ctx.body = { code: 200, msg: '注册成功' };
        } else {
            ctx.body = { code: 400, msg: '注册失败' };
        }
    }

    // 登录
    async login() {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body || {};
        const name = await ctx.service.login.index(username);
        if (name && name.password == this.getMd5Data(password)) {
            // 验证通过，生成token
            const token = app.jwt.sign({
                name: name.username,
                exp: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 240
            }, app.config.jwt.secret);
            //存到cookie当中，设置过期时间为一天
            ctx.cookies.set('token', token, {
                maxAge: 24 * 3600 * 1000
                // maxAge: 3000 //三秒
            })
            // console.log(ctx,'ctx.modelctx.modelctx.modelctx.modelctx.model')
            // let arr = await ctx.model.User.indexItemById(user.id)
            // console.log(arr,'arr---------------------------------------------')
            ctx.body = {
                code: 200,
                data: name,
                msg: '请求成功'
            }
        } else {
            const res = "用户名或密码错误"
            const code = 201
            ctx.helper.success({ ctx, code, res })
        }
    }

    // 退出登录
    async loginOut() {
        const { ctx } = this;
        ctx.cookies.set('token', null)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }
    // 专门对数据进行md5加密的方法，输入明文返回密文
    getMd5Data(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}

module.exports = LoginController;
