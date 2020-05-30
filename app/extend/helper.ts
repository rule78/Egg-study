export default {
  isObjectEmpty(obj: any) {
    let isEmpty = false;
    if (!obj || Object.keys(obj).length === 0) { // 是否为null,undefined,或者空对象
        isEmpty = true;
    }
    return isEmpty;
  },
  printLog(err: any) {
    const name = err.name;
    const message = err.message;
    const detail = err.msg || '';
    const stack = err.stack;
    const log = { name, message, detail, stack };
    console.log(JSON.stringify(log));
  },
  stringtobase64(value: string): string {
    const b = new Buffer(value);
    const s = b.toString('base64');
    return s;
  },
  base64tostring(value: string): string {
    return new Buffer(value, 'base64').toString();
  },
};
