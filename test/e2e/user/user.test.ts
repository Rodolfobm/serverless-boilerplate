import * as request from 'supertest';

describe('/user', () => {

    test.only('Shall create a mocked user', async (done: jest.DoneCallback) => {
        const res: request.Response = await request(`localhost:3000`)
                                                    .get('/user')
                                                    .expect('Content-Type', /json/)
                                                    .expect(200);
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe('NEW NAME');
        done();
    });
});
