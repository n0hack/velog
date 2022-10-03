import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router();

post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

// 미들웨어를 통한 ObjectId 검증
posts.use('/:id', postsCtrl.getPostById, post.routes());

export default posts;
