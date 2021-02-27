describe('testing-server-routes', () => {
	const createMockUser = async () => {
		const newUser = {
			name: 'John Doe',
			email: `john${Math.random()}@mail.com`,
			password: '1234',
		};
		const response = await global.testRequest.post('/api/user/create-user').send(newUser);
		return response.body.data;
	};
	it('POST /Get Comic - success', async () => {
		const user = await createMockUser();
		const getComic = {
			userId: user.id,
			searchParameter: 'spider',
		};
		const response = await global.testRequest
			.post('/api/comic/')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			)
			.send(getComic);

		expect(response.status).toBe(200);
	});

	it('POST /Get character comic - success', async () => {
		const user = await createMockUser();
		const getCharacterComic = {
			userId: user.id,
		};
		const response = await global.testRequest
			.post('/api/comic/90114/characters')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			)
			.send(getCharacterComic);

		expect(response.status).toBe(200);
	});
});
