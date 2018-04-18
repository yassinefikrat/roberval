const
	PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
	isProduction: PRODUCTION,
	express: {
	  port: process.env.EXPRESS_PORT || 3000,
	  ip: '127.0.0.1'
	},
	mongo: {
		connectionString: 'mongodb://localhost:27017/test',
		dbName: 'robervalDB',
		collectionName: 'test'
	}
};
