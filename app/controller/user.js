'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const pump = require('pump');

class UserController extends Controller {

    async index() {
        const { ctx } = this;
        const UserList = await ctx.service.user.index();
        ctx.body = {
            code: 200,
            data: UserList,
            msg: '请求成功'
        }
    }

    async editPwd() {
        const { ctx } = this;
        const { id, password } = ctx.request.body || {};
        await ctx.service.user.editPwd(id, password);
        ctx.body = { code: 200, msg: '修改成功' };
    }

    async upImg() {
        const { ctx } = this;
        const parts = ctx.multipart({ autoFields: true });
        let files = {};
        let stream;
        while ((stream = await parts()) != null) {
            if (!stream.filename) {
                break;
            }
            const fieldname = stream.fieldname; // file表单的名字
            // 上传图片的目录
            const dir = await this.service.tools.getUploadFile(stream.filename);
            const target = dir.uploadDir;
            const writeStream = fs.createWriteStream(target);

            await pump(stream, writeStream);

            files = Object.assign(files, {
                [fieldname]: dir.saveDir
            });
        }

        if (Object.keys(files).length > 0) {
            ctx.body = {
                code: 200,
                message: '图片上传成功',
                data: files
            }
        } else {
            ctx.body = {
                code: 500,
                message: '图片上传失败',
                data: {}
            }
        }
    }

    async editUser() {
        const { ctx } = this;
        const { id, phone, nickname, imgUrl } = ctx.request.body || {};
        const edit = await ctx.service.user.editUser(id, phone, nickname, imgUrl);
        ctx.body = {
            code: 200,
            data: edit,
            msg: '修改成功'
        }
    }
}

module.exports = UserController;
