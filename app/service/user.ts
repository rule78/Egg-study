import { Service } from 'egg';
import { UserInfo } from '../dto/user/userInfo';
export default class UserService extends Service {
  /**
   * 获取用户信息
   * @param token 用户token
   */
  async userInfo (token: string): Promise<UserInfo> {
    const host = this.app.config.hostUrl.mgmtoath2;
    const data = await this.ctx.curl(`${host}/uaa/principal`, {
      headers: {
        Authorization: token,
      },
      contentType: 'application/json',
      dataType: 'json',
    });
    if (data.status === 200) {
      const user: UserInfo = {
        accountId: data.data.accountId,
        username: data.data.username,
        displayName: data.data.displayName,
      };
      return user;
    }
    return {} as UserInfo ;
  }
  /**
   * 短token变长token
   * @param token guid token
   */
  async tokenShort2Long(token: string) {
    const data = await this.ctx.curl(`${this.app.config.hostUrl.mgmtgateway}/jwt?regex=%5E(dajian-manager%7Cstaff):.*`, {
      headers: { Authorization: token },
      dataType: 'text',
    });
    if (data.status === 200) {
      return data.data;
    }
  }

