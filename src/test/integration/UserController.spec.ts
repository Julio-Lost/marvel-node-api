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

	const createMockFavoriteComicUser = async () => {
		const newUser = {
			name: 'John Doe',
			email: `john${Math.random()}@mail.com`,
			password: '1234',
		};
		const response = await global.testRequest.post('/api/user/create-user').send(newUser);
		return response.body.data;
	};

	const createMockFavoriteComic = async () => {
		const user = await createMockFavoriteComicUser();
		const favoriteComicUser = {
			characterId: '12345',
			name: 'Marvel',
			description: 'Marvel',
			thumbnailUrl: 'http://teste.com',
			detailUrl: 'http://teste.com',
			userId: user.id,
		};

		const response = await global.testRequest
			.post('/api/user/add-favorite-comic')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			)
			.send(favoriteComicUser);
		return response.body.data;
	};

	const createMockFavoriteCharacterUser = async () => {
		const newUser = {
			name: 'John Doe',
			email: `john${Math.random()}@mail.com`,
			password: '1234',
		};
		const response = await global.testRequest.post('/api/user/create-user').send(newUser);
		return response.body.data;
	};

	const createMockFavoriteCharacter = async () => {
		const user = await createMockFavoriteCharacterUser();
		const favoriteCharacterUser = {
			comicId: '12345789',
			title: 'Marvel',
			description: 'Marvel',
			thumbnailUrl: 'http://teste.com',
			detailUrl: 'http://teste.com',
			userId: user.id,
		};

		const response = await global.testRequest
			.post('/api/user/add-favorite-character')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			)
			.send(favoriteCharacterUser);
		return response.body.data;
	};

	it('POST /Create User - success', async () => {
		const newUser = {
			name: 'John Doe',
			email: 'john@mail.com',
			password: '1234',
		};
		const response = await global.testRequest.post('/api/user/create-user').send(newUser);
		expect(response.status).toBe(200);
	});

	it('POST /Session user - success', async () => {
		const newUser = {
			email: 'john@mail.com',
			password: '1234',
		};
		const response = await global.testRequest.post('/api/user/session').send(newUser);

		expect(response.status).toBe(200);
	});

	it('POST /Update User - success', async () => {
		const user = await createMockUser();
		const updateUser = {
			name: 'John Doe',
			email: 'john123123213212335@mail.com',
			id: user.id,
		};

		const response = await global.testRequest
			.post('/api/user/update-user')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			)
			.send(updateUser);
		expect(response.status).toBe(200);
	});

	it('POST /Add favorite comic User - success', async () => {
		const user = await createMockUser();

		const favoriteComicUser = {
			comicId: '123456789',
			title: 'Marvel',
			description: 'Marvel',
			thumbnailUrl: 'http://teste.com',
			detailUrl: 'http://teste.com',
			userId: user.id,
		};

		const response = await global.testRequest
			.post('/api/user/add-favorite-comic')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			)
			.send(favoriteComicUser);
		expect(response.status).toBe(200);
	});

	it('POST /Remove favorite comic User - success', async () => {
		const user = await createMockFavoriteComicUser();
		createMockFavoriteComic();

		const favoriteComicUser = {
			comicId: '12345789',
			userId: user.id,
		};

		const response = await global.testRequest
			.post('/api/user/remove-favorite-comic')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			)
			.send(favoriteComicUser);
		expect(response.status).toBe(200);
	});

	it('POST /Add favorite character User - success', async () => {
		const user = await createMockUser();
		const favoriteCharacterUser = {
			characterId: '12345',
			name: 'Marvel',
			description: 'Marvel',
			thumbnailUrl: 'http://teste.com',
			detailUrl: 'http://teste.com',
			userId: user.id,
		};

		const response = await global.testRequest
			.post('/api/user/add-favorite-character')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			)
			.send(favoriteCharacterUser);

		expect(response.status).toBe(200);
	});

	it('POST /remove favorite character User - success', async () => {
		const user = await createMockFavoriteCharacterUser();
		createMockFavoriteCharacter();

		const favoriteCharacterUser = {
			characterId: '12345',
			userId: user.id,
		};

		const response = await global.testRequest
			.post('/api/user/remove-favorite-character')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			)
			.send(favoriteCharacterUser);

		expect(response.status).toBe(200);
	});

	it('GET /get favorite character User - success', async () => {
		const user = await createMockFavoriteCharacterUser();
		createMockFavoriteCharacter();

		const response = await global.testRequest
			.get(`/api/user/${user.id}/favorites-characters`)
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			);

		expect(response.status).toBe(200);
	});

	it('GET /get favorite comic User - success', async () => {
		const user = await createMockFavoriteCharacterUser();
		createMockFavoriteCharacter();

		const response = await global.testRequest
			.get(`/api/user/${user.id}/favorites-comics`)
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM2YjEyMy02MDQxLTRlYmMtYTAyYy03NjViZmY0YzhlNTYiLCJpYXQiOjE2MTQzNjE1OTN9.TAQmKuoEyNeomuIvP5ASjn6TOXvJJSbmtBAxS-835Xs'
			);

		expect(response.status).toBe(200);
	});
});
