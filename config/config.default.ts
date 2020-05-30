import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { loadsync } from 'jk-ui-env';
let conf;
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  if (!conf) {
    conf = loadsync(appInfo.name);
  }
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574995459292_260';

  // add your egg config in here
  config.middleware = [ 'errorHandler', 'userToken', 'gzip' ];
  config.security = {
    domainWhiteList: [
      'jianke.com',
    ],
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };
  config.error = {
    400: { code: 400, message: 'Invalid Param', detail: '' },
    401: { code: 401, message: 'Unauthorized', detail: '' },
    403: { code: 403, message: 'Forbidden', detail: '' },
    404: { code: 404, message: 'Not Found', detail: '' },
    500: { code: 500, message: 'Internal Server Error', detail: '' },
    502: { code: 502, message: 'Remote Error', detail: '' },
  };
  config.mongoose = {
    url: conf.env['mongodb.infoKm'],
    options: {
      poolSize: 10,
      keepAlive: true,
      reconnectTries: 30,
      reconnectInterval: 3000,
    },
  };

  config.redis = {
    client: {
      host: conf.env['redis.host'],
      port: conf.env['redis.port'],
      password: conf.env['redis.password'],
      db: 0,
    },
  };

  config.hostUrl = {
    mgmtoath2: conf.env.mgmtoauth2,
    imapigateway: conf.env.imapigateway,
    imapibasictoken: conf.env.imapibasictoken,
    mgmtgateway: conf.env.mgmtgateway,
    kmhost: conf.env.kmhost,
  };
  config.pvinterval = conf.env.pvinterval;

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
