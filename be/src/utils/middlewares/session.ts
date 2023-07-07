import { NextFunction, Request, Response } from 'express';

import z from 'shared/zod';
import { sessionRepository } from '../../repositories';



const sidSchema = z.string().uuid();


export const loadSession = async (req: Request, res: Response, next: NextFunction) => {
  let createNewSession = true;

  if ('sid' in req.cookies) {
    const sid = req.cookies['sid'];
    const sidValidated = sidSchema.safeParse(sid);

    req.session = {
      id: sid,
      userId: undefined,
    };

    if (sidValidated.success) {
      const session = await sessionRepository.getUserId({ id: sidValidated.data });
  
      if (session !== null) {
        if (session.userId !== null) {
          req.session.userId = session.userId;
        }

        createNewSession = false;
      }
    }
  }

  if (createNewSession) {
    const session = await sessionRepository.create();
    res.cookie('sid', session.id, { httpOnly: true, sameSite: 'lax' });

    req.session = {
      id: session.id,
      userId: undefined,
    };
  }

  next();
}