module.exports = () => {
    return async function (ctx, next) {
      let token = ctx.cookies.get('token')
      if (token) {
        //验证cookie 携带的token，提取信息
        const result = await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
        ctx.logger.debug('验证结果：', result);
        console.log(result,'result')
        if (result.name) {
          ctx.state.name = result.name;
        }
        await next();
      } else {
        ctx.status = 401;
        ctx.body = {
          data:'鉴权失败，请先登录'
        }
      }
    };
  };