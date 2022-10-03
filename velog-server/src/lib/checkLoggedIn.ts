import { IMiddleware } from 'koa-router';

const checkLoggedIn: IMiddleware = (ctx, next) => {
	if (!ctx.state.user) {
		ctx.status = 401;
		return;
	}
	return next();
};

export default checkLoggedIn;
