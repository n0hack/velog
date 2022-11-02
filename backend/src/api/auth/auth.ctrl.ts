import { IMiddleware } from 'koa-router';
import { MongooseError } from 'mongoose';
import Joi from 'joi';
import User from '@model/user';

// 회원가입 (POST /api/auth/register)
// { username, password }
export const register: IMiddleware = async (ctx) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409;
      return;
    }

    const user = new User({ username });
    await user.setPassword(password);
    await user.save();

    // 응답할 데이터에서 hashedPassword 필드 제거
    const data = user.serialize();
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

// 로그인 (POST /api/auth/login)
// { username, password }
export const login: IMiddleware = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

// 로그인 상태 확인 (GET /api/auth/check)
export const check: IMiddleware = async (ctx) => {};

export const logout: IMiddleware = async (ctx) => {};
