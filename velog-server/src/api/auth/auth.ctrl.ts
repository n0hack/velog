import { MongooseError } from 'mongoose';
import Joi from 'joi';
import { IMiddleware } from 'koa-router';
import User from '../../model/user';

type AuthRequestBody = {
  username: string;
  password: string;
};

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

  const { username, password } = <AuthRequestBody>ctx.request.body;
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
    ctx.body = user.serialize();

    // JWT 설정
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

// 로그인 (POST /api/auth/login)
// { username, password }
export const login: IMiddleware = async (ctx) => {
  const { username, password } = <AuthRequestBody>ctx.request.body;

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

    // JWT 설정
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e as MongooseError);
  }
};

// 로그인 상태 확인 (GET /api/auth/check)
export const check: IMiddleware = async (ctx) => {
  const { user } = ctx.state;
  // 로그인 중이 아님
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};

// 로그아웃 (POST /api/auth/logout)
export const logout: IMiddleware = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
