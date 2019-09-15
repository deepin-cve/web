// web api代理,可通过环境变量api_url修改默认值

const target = process.env.api_url || 'http://10.0.10.67:10808';

module.exports = {
	'/api': {
		target: target,
		secure: false,
		ws: true,
		pathRewrite: {
			'^/api': '/v0',
		},
	},
};
