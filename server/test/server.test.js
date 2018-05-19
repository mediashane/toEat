const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { toEat } = require('./../models/eats');

const localToEats = [{
    text: 'first thing to eat'
    }, {
    text: 'second thing to eat'
}];

beforeEach((done) => {
    toEat.remove({}).then(() => {
        return toEat.insertMany(localToEats);
    }).then(() => done());
});

describe('POST /toeats', () => {
    it('should create a new toEat', (done) => {
        const text = 'test toEat';

        request(app)
        .post('/toeats')
        .send({ text })
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            toEat.find({text}).then((toeats) => {
                expect(toeats.length).toBe(1);
                expect(toeats[0].text).toBe(text);
                done();
            }).catch((err) => done(err));
        });
    });

    it('should not create toEat with invalid body data', (done) => {

        request(app)
        .post('/toeats')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            toEat.find().then((toeats) => {
                expect(toeats.length).toBe(2);
                done();
            }).catch((err) => done(err));
        })
    });
});

describe('GET /toeats', () => {
    it('should get all /toeats', (done) => {
        request(app)
            .get('/toeats')
            .expect(200)
            .expect((res) => {
                expect(res.body.toeats.length).toBe(2);
            })
            .end(done);
    });
});