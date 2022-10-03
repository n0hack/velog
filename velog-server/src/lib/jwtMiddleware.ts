import jwt, { JwtPayload } from 'jsonwebtoken';
import { IMiddleware } from 'koa-router';
import User from '../model/user';

const jwtMiddleware: IMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    ctx.state.user = {
      _id: (<JwtPayload>decoded)._id,
      username: (<JwtPayload>decoded).username,
    };

    // 토큰의 남은 유효 기간이 3.5일 미만이면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (((<JwtPayload>decoded).exp as number) - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById((<JwtPayload>decoded)._id);
      const token = user?.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
