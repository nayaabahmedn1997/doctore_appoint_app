import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import { registerUser, loginUser } from '../controllers/userController.js';
import { app } from '../index.js';




// Mock the DB model
jest.mock('../models/userModel.js');
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mocked-token'),
    verify: jest.fn(() => { id: 'mockedUserId' }),
}));

// ✅ Register test
describe('POST /register', () => {

    beforeAll(() => {
        process.env.JWT_SECRET = 'testsecret';
    });

    it('should register a new user', async () => {
        userModel.findOne.mockResolvedValue(null); // no existing user
        userModel.prototype.save = jest.fn().mockResolvedValue();

        const res = await request(app).post('/auth/registerUser').send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
    });

    it('should fail if user already exists', async () => {
        userModel.findOne.mockResolvedValue({ email: 'test@example.com' });

        const res = await request(app).post('/auth/registerUser').send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
    });
});

// ✅ Login test
describe('POST /login', () => {
    beforeAll(() => {
        process.env.JWT_SECRET = 'testsecret';
    });
    it('should log in user with correct credentials', async () => {
        const mockUser = {
            _id: 'userId123',
            name: 'Test User',
            email: 'test@example.com',
            comparePassword: jest.fn().mockResolvedValue(true)
        };
        userModel.findOne.mockResolvedValue(mockUser);
        jwt.sign = jest.fn().mockReturnValue('mocked-token');

        const res = await request(app).post('/auth/loginUser').send({
            email: 'test@example.com',
            password: 'password123'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBe('mocked-token');
    });

    it('should fail if user does not exist', async () => {
        userModel.findOne.mockResolvedValue(null);

        const res = await request(app).post('/auth/loginUser').send({
            email: 'wrong@example.com',
            password: 'password123'
        });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
    });

    it('should fail if password is incorrect', async () => {
        const mockUser = {
            comparePassword: jest.fn().mockResolvedValue(false)
        };
        userModel.findOne.mockResolvedValue(mockUser);

        const res = await request(app).post('/auth/loginUser').send({
            email: 'test@example.com',
            password: 'wrongpassword'
        });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
    });
});

// ✅ Fetch user test
describe('GET /auth/get-user-data', () => {
  beforeEach(() => {
    jwt.verify.mockReturnValue({ id: 'mockedUserId' });

   
  });

  it('should return user data', async () => {
     jwt.verify.mockReturnValue({ id: 'mockedUserId' });
     await userModel.findById.mockResolvedValue({
      _id: 'mockedUserId',
      name: 'John Doe',
      email: 'john@example.com',
    });
    const res = await request(app)
      .get('/auth/get-user-data')
      .set('Authorization', 'Bearer mocked-token');
      console.log(res)
    jest.spyOn(console, 'log')
    expect(res.statusCode).toBe(200);
    
    expect(res.body).toMatchObject({
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(userModel.findById).toHaveBeenCalledWith('mockedUserId');
  });
});