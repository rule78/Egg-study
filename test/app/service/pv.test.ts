import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/pv.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('pv', async () => {
    const result = await ctx.service.pv.pvPersistentStroage();
    assert(result);
  });
});
