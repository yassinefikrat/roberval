const
	express 		= require('express'),
	router 			= express.Router(),
	posts 			= require('./api/posts'),
	casting 		= require('./services/casting')

module.exports = router;

casting.hire().then(result => {

	casting.sendToMainMan('do', 'that')

	router.get('/rooms', (req, res, next) => {
		casting.sendToMainMan('forwardWithMessage', {to: 'endpointGuy', topic: 'getRooms', message: {req, res, next}})
	})

	router.get('/rooms/:name', (req, res, next) => {
		casting.sendToMainMan('forwardWithMessage', {to: 'endpointGuy', topic: 'getRoomByName', message: {req, res, next}})
	})

	router.post('/rooms', (req, res, next) => {
		casting.sendToMainMan('forwardWithMessage', {to: 'endpointGuy', topic: 'postRoom', message: {req, res, next}})
	})

	router.put('/rooms/:name', (req, res, next) => {
		casting.sendToMainMan('forwardWithMessage', {to: 'endpointGuy', topic: 'putRoom', message: {req, res, next}})
	})

	router.delete('/rooms/:name', (req, res, next) => {
		casting.sendToMainMan('forwardWithMessage', {to: 'endpointGuy', topic: 'deleteRoom', message: {req, res, next}})
	})

	router.get('/users', (req, res, next) => {
		casting.sendToMainMan('forwardWithMessage', {to: 'endpointGuy', topic: 'getUsers', message: {req, res, next}})
	})

	router.get('/users/:name', (req, res, next) => {
		casting.sendToMainMan('forwardWithMessage', {to: 'endpointGuy', topic: 'getUserByName', message: {req, res, next}})
	})

	router.post('/users', (req, res, next) => {
		casting.sendToMainMan('forwardWithMessage', {to: 'endpointGuy', topic: 'postUser', message: {req, res, next}})
	})

	router.put('/users/:name', (req, res, next) => {
		casting.sendToMainMan('forwardWithMessage', {to: 'endpointGuy', topic: 'putUser', message: {req, res, next}})
	})

	router.delete('/users/:name', (req, res, next) => {
		casting.sendToMainMan('forwardWithMessage', {to: 'endpointGuy', topic: 'deleteUser', message: {req, res, next}})
	})

	router.use('/posts', posts);

	router.use('/', (req, res, next) => {
		res.status(200).send("hello world!");
	});

})
