const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { toEat } = require('./../models/eats');

const localToEats = [{
    text: 'first thing to eat',
    _id: new ObjectID
    }, {
    text: 'second thing to eat',
    _id: new ObjectID
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

describe('GET /toeats/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/toeats/${localToEats[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                console.log('BODY', res.body)
                expect(res.body.eat.text).toBe(localToEats[0].text)
            })
            .end(done);
    });

    it('should retun 404 if eat not found', (done) => {
        const hexId = new ObjectID().toHexString();
        request(app)
            .get(`/toeats/${hexId}`)
            .expect(404)
            .end(done);
        });

    it('should retun 404 if id is invalid', (done) => {
        request(app)
            .get(`/toeats/123ABC`)
            .expect(404)
            .end(done);
    });
}); 