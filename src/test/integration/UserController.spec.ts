describe('testing-server-routes', () => {
	it('POST /Create User - success', async () => {
		const newUser = {
			name: 'John Doe',
			email: 'john@mail.com',
			password: '1234',
		};
		const response = await global.testRequest.post('/api/user/create-user').send(newUser);
		expect(response.status).toBe(200);
	});
});
