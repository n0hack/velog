import Koa from 'koa';

const app = new Koa();

app.listen(4000, () => {
	console.log('Server is running on port 4000');
});
