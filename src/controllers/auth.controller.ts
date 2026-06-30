import { Request, Response } from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      name: name,
      email: email,
      passwordHash: hash,
    });

    await user.save();

    res.status(201).json({ name: name, email: email });
  } catch (error) {
    res.status(400).json({ name: name, email: email, error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(401).json({ text: '❌ User with this email not found' });
    return;
  }

  const userHash = user.get('passwordHash');
  const checkPassword = await bcrypt.compare(password, userHash);

  if (!checkPassword) {
    res.status(401).json({ text: '❌ Wrong password' });
    return;
  }

  const userId = user.get('_id');
  const privateKey = process.env.JWT_SECRET as string;

  const jwtToken = jwt.sign({ id: userId }, privateKey, { expiresIn: '1d' });

  res.status(200).json({ jwtToken: jwtToken });
};
