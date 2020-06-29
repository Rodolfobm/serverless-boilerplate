import * as request from 'supertest';

describe('/CUSTOMTEST', () => {
    test.only('Shall RUN CUSTOM', async (done: jest.DoneCallback) => {
        const res: request.Response = await request(`localhost:3000`)
                                                    .get('/test')
                                                    .expect('Content-Type', /json/)
                                                    .expect(200);
        expect(res.body).toBeDefined();
        expect(res.body.custom).toBe('Success');
        done();
    });
});
