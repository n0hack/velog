import { IMiddleware } from 'koa-router';
import mongoose, { MongooseError } from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';
import Post from '@model/post';

const { ObjectId } = mongoose.Types;

// 특정 태그와 속성만 허용 (Sanitize HTML)
const sanitizeOption = {
  allowedTags: ['h1', 'h2', 'b', 'i', 'u', 's', 'p', 'ul', 'ol', 'li', 'blockquote', 'a', 'img'],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

export const getPostById: IMiddleware = async (ctx, next) => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

export const checkOwnPost: IMiddleware = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
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
  const post = new Post({ title, body: sanitizeHtml(body, sanitizeOption), tags, user: ctx.state.user });

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

// 포스트 조회 (GET /api/posts)
const removeHtmlAndShorten = (body: string) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const list: IMiddleware = async (ctx) => {
  const page = parseInt((ctx.query.page as string) || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tag } : {}),
  };
  console.log(query);

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      // lean()을 사용하면 JSON으로 반환
      .lean()
      .skip((page - 1) * 10)
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10).toString());
    ctx.body = posts
      // .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body: removeHtmlAndShorten(post.body as string),
      }));
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

// 특정 포스트 조회 (GET /api/posts/:id)
export const read: IMiddleware = async (ctx) => {
  ctx.body = ctx.state.post;
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

  // Sanitize HTML 적용
  const nextData = { ...ctx.request.body };
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, { new: true });
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};
