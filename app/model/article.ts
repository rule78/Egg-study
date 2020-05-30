import { Application } from 'egg';
import * as Moment from 'moment';
export default (app: Application) => {
  const mongoose = app.mongoose;
  const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    tags: Array,
    catalogId: String,
    isRecommend: Boolean,
    attachs: [{
      name: String,
      url: String,
    }],
    pv: Number,
    auditStatus: Number,
    isValid: {
      type: Number,
      default: 1,
    },
    createDate: {
      type: Date,
      // default: Moment(),
    },
    createUser: String,
    modifyDate: {
      type: Date,
      default: Moment(),
    },
    modifyUser: String,
  });
  return mongoose.model('Article', ArticleSchema);
};
