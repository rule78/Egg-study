'use strict';

import { Context } from 'egg';
export default function tokenMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const token = ctx.header.authorization;
    if (ctx.path === '/health') {
      await next();
      return;
    }
    if (!token) {
      ctx.status = 401;
      ctx.body = { success: false, data: { message: '用户token错误或过期' } };
      return;
    }
    const userInfo = await ctx.service.user.userInfo(token);
    if (!ctx.helper.isObjectEmpty(userInfo)) {
      ctx.user = userInfo;
      await next();
    } else {
      ctx.status = 401;
      ctx.body = { success: false, data: { message: '用户token错误或过期' } };
    }
  };
}
