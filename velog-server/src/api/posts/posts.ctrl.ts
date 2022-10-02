import { IMiddleware } from 'koa-router';

type PostRequestBody = {
	title: string;
	body: string;
};

let postId = 1;

const posts = [
	{
		id: 1,
		title: '제목',
		body: '내용',
	},
];

// 포스트 작성 (POST /api/posts)
// { title, body }
export const write: IMiddleware = (ctx) => {
	const { title, body } = <PostRequestBody>ctx.request.body;
	postId += 1;
	const post = { id: postId, title, body };
	posts.push(post);
	ctx.body = post;
};

// 포스트 조회 (GET /api/posts)
export const list: IMiddleware = (ctx) => {
	ctx.body = posts;
};

// 특정 포스트 조회 (GET /api/posts/:id)
export const read: IMiddleware = (ctx) => {
	const { id } = ctx.params;
	const post = posts.find((post) => post.id.toString() === id);

	if (!post) {
		ctx.status = 404;
		ctx.body = {
			message: '포스트가 존재하지 않습니다.',
		};
		return;
	}
	ctx.body = post;
};

// 특정 포스트 제거 (DELETE /api/posts/:id)
export const remove: IMiddleware = (ctx) => {
	const { id } = ctx.params;
	const index = posts.findIndex((post) => post.id.toString() === id);

	if (index === -1) {
		ctx.status = 404;
		ctx.body = {
			message: '포스트가 존재하지 않습니다.',
		};
		return;
	}
	posts.splice(index, 1);
	ctx.status = 204;
};

// 특정 포스트 전체 수정 (PUT /api/posts/:id)
// { title, body }
export const replace: IMiddleware = (ctx) => {
	const { id } = ctx.params;
	const index = posts.findIndex((post) => post.id.toString() === id);

	if (index === -1) {
		ctx.status = 404;
		ctx.body = {
			message: '포스트가 존재하지 않습니다.',
		};
		return;
	}

	posts[index] = {
		id: Number(id),
		...(<PostRequestBody>ctx.request.body),
	};
	ctx.body = posts[index];
};

// 특정 포스트 일부 수정 (PATCH /api/posts/:id)
export const update: IMiddleware = (ctx) => {
	const { id } = ctx.params;
	const index = posts.findIndex((post) => post.id.toString() === id);

	if (index === -1) {
		ctx.status = 404;
		ctx.body = {
			message: '포스트가 존재하지 않습니다.',
		};
		return;
	}

	posts[index] = {
		...posts[index],
		...(<PostRequestBody>ctx.request.body),
	};
	ctx.body = posts[index];
};
