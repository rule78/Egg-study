import { Application } from 'egg';
import * as Moment from 'moment';
export default (app: Application) => {
  const mongoose = app.mongoose;
  const ArticleLogSchema = new mongoose.Schema({
    articleId: String,
    operator: String,
    operateContent: String,
    isValid: {
      type: Number,
      default: 1,
    },
    createDate: {
      type: Date,
      default: Moment(),
    },
    createUser: String,
    modifyDate: {
      type: Date,
      default: Moment(),
    },
    modifyUser: String,
  });
  return mongoose.model('ArticleLog', ArticleLogSchema);
};
