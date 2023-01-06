import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

import prisma from '../db/prisma';

// // jwt token generator
const createToken = (id: number) => {
  return jwt.sign({ id }, process.env.SECRET!, { expiresIn: '5d' });
};

// // login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email) throw new Error('Email must be filled in');
    if (!password) throw new Error('Password must be filled in');

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error('Email does not exist');

    // Check if passwords match
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Incorrect password');

    const name = user.name;
    const token = createToken(user.id);

    res.json({ name, email, token });
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

// // signup user
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validate email and password
    if (!name) throw new Error('Name must be filled in');
    if (!email) throw new Error('Email must be filled in');
    if (!password) throw new Error('Password must be filled in');
    if (!validator.isEmail(email)) throw new Error('Must be a valid email');
    if (!validator.isStrongPassword(password)) {
      throw new Error('Password must be stronger');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    // create jwt token
    const token = createToken(user.id);

    res.json({ name, email, token });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        return res.status(400).json('Email is already in use');
      }
    }

    res.status(400).json(error.message);
  }
};
