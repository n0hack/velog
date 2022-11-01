import { IMiddleware } from 'koa-router';
import mongoose, { MongooseError } from 'mongoose';
import Joi from 'joi';
import Post from '@model/post';

const { ObjectId } = mongoose.Types;

// ObjectId 검증 미들웨어
export const checkObjectId: IMiddleware = (ctx, next) => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  next();
};

// 포스트 작성 (POST /api/posts)
// { title, body }
export const write: IMiddleware = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({ title, body, tags });

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

// 포스트 조회 (GET /api/posts)
export const list: IMiddleware = async (ctx) => {
  const page = parseInt((ctx.query.page as string) || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(10)
      // lean()을 사용하면 JSON으로 반환
      .lean()
      .skip((page - 1) * 10)
      .exec();
    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10).toString());
    ctx.body = posts
      // .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body: (post.body as string).length < 200 ? post.body : `${post.body?.slice(0, 200)}...`,
      }));
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

// 특정 포스트 조회 (GET /api/posts/:id)
export const read: IMiddleware = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

// 특정 포스트 제거 (DELETE /api/posts/:id)
export const remove: IMiddleware = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

// 특정 포스트 일부 수정 (PATCH /api/posts/:id)
export const update: IMiddleware = async (ctx) => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, { new: true });
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};
