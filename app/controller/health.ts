import { Controller } from 'egg';
import { version, name, description } from '../../package.json';
export default class HealthController extends Controller {
  public async index() {
    const { ctx } = this;
    const model = this.app.model.Article;
    const info = await model.db.db.command({ buildInfo: 1 });
    ctx.body = {
      description,
      version,
      name,
      status: 'UP',
      mongo: info.version,
    };
  }
}
