import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
import dotenv from 'dotenv';
dotenv.config();

let loginToken
let resetToken
let noteId

describe('API testing', () => {
    beforeAll((done) => {
        const clearCollections = () => {
          for (const collection in mongoose.connection.collections) {
            mongoose.connection.collections[collection].deleteOne(() => {});
          }
        };
        const mongooseConnect = async () => {
          await mongoose.connect(process.env.DATABASE_TEST);
          clearCollections();
        };
        if (mongoose.connection.readyState === 0) {
          mongooseConnect();
        } else {
          clearCollections();
        }
        done();
    })

    afterAll(async () => {
      await mongoose.connection.close();
    });

    describe('New User', () => {
      it('Should not return user object', async () => {
        const res = await request(app)
          .post('/api/users').send({
            firstName: "Harsh",
            lastName: "",
            email: "harsh@email.com",
            password: "Harsh@123"
          })
          expect(res.status).toBe(500)
      });

      it('Should return user object', async () => {
        const res = await request(app)
          .post('/api/users').send({
            firstName: "Prateek",
            lastName: "Hiremath",
            email: "prateek.s.hiremath123@gmail.com",
            password: "Prateek@123"
          })
          expect(res.status).toBe(201)
          expect(res.body.data._id).toBeDefined()
      });
    });

    describe('Login User', () => {
      it('Should return token', async () => {
        const res = await request(app)
          .post('/api/users/login').send({
            email: "prateek.s.hiremath123@gmail.com",
            password: "Prateek@123"
          })
          loginToken = res.body.token
          expect(res.status).toBe(200)
      });
    });

    describe('Forgot Password', () => {
      it('Should send mail along with token', async () => {
        const res = await request(app)
          .post('/api/users/forgotpassword').send({
            email: "prateek.s.hiremath123@gmail.com"
          })
          .expect(200)
        resetToken = res.body.token
      });
    });

    describe('Reset Password', () => {
      it('Should reset the password', async () => {
        const res = await request(app)
          .post('/api/users/resetPassword')
          .set('Authorization', `Bearer ${resetToken}`)
          .send({ password: "Hiremath@987" });
        expect(res.statusCode).toBe(200);
      });
    });

    describe('Create Note', () => {
      it('Should create a new note', async () => {
        const res = await request(app)
          .post('/api/notes')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            title: 'Test Note',
            discription: 'This is a test note',
            color: 'yellow',
          });
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('_id');
        noteId = res.body.data._id;
      });

      it('Should create a new note', async () => {
        const res = await request(app)
          .post('/api/notes')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            title: '',
            discription: 'jest',
            color: 'red',
          });
        expect(res.status).toBe(500);
      });

    })

    describe('Get all Note', () => {
      it('Should create a new note', async () => {
        const res = await request(app)
          .get('/api/notes')
          .set('Authorization', `Bearer ${loginToken}`)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
      });
    })

    describe('Get single Note', () => {
      it('Should create a new note', async () => {
        const res = await request(app)
          .get(`/api/notes/${noteId}`)
          .set('Authorization', `Bearer ${loginToken}`)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
      });
    })

    describe('Update Note', () => {
      it('Should update an existing note', async () => {
        const res = await request(app)
          .put(`/api/notes/${noteId}`)
          .set('Authorization', `Bearer ${loginToken}`)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
      });

      it('Should not update note', async () => {
        const res = await request(app)
          .put(`/api/notes/${noteId},0`)
          .set('Authorization', `Bearer ${loginToken}`)
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
      });
    })

    describe('archive a Note()', () => {
      it('Should toggle isArchive in note', async () => {
        const res = await request(app)
          .post(`/api/notes/isArchived/${noteId}`)
          .set('Authorization', `Bearer ${loginToken}`)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
      });
    })

    describe('trash a Note()', () => {
      it('Should toggle isTrached in note', async () => {
        const res = await request(app)
          .post(`/api/notes/isTrashed/${noteId}`)
          .set('Authorization', `Bearer ${loginToken}`)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
      });
    })

    describe('delete a Note()', () => {
      it('Should delete a note', async () => {
        const res = await request(app)
          .delete(`/api/notes/${noteId}`)
          .set('Authorization', `Bearer ${loginToken}`)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
      });
    })

});