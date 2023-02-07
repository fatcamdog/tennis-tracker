import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import prisma from '../db/prisma';

interface JwtPayload {
  id: string;
}

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // make sure user has authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    // verify user token
    const { id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    req.user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    next();
  } catch (error) {
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

export default requireAuth;
