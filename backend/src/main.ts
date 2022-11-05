import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { koaSwagger } from 'koa2-swagger-ui';
import yamljs from 'yamljs';
import api from './api';
import jwtMiddleware from '@lib/jwtMiddleware';
import path from 'path';
import serve from 'koa-static';
import send from 'koa-send';

dotenv.config();

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI as string)
  .then(() => {
    // createFakeData();
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

const spec = yamljs.load('./api.yaml');

router.get('/api', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));
router.use('/api', api.routes());

app.use(bodyParser({ jsonLimit: '50mb', formLimit: '50mb' }));
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../frontend/build');
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Server is running on port %d', port);
});
