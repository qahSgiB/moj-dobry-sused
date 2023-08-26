import { Result } from "@badrap/result";
import * as argon2 from 'argon2'
import { Prisma } from "@prisma/client";
import prisma from "../client";

import { UUIDModel } from "shared/types";

import { FeErrorClassed, SessionLoggedIn } from "../types";



export const create = async (): Promise<UUIDModel> => {
  return await prisma.session.create({
    select: {
      id: true,
    },
    data: {},
  });
}


type SessionUserId = {
  userId: number | null,
} | null

export const getUserId = async (data: UUIDModel): Promise<SessionUserId> => {
  return await prisma.session.findUnique({
    where: {
      id: data.id,
    },
    select: {
      userId: true,
    },
  });
}


type LoginData = {
  sid: string,
  user: {
    email: string,
    password: string,
  }
}

export const login = async (data: LoginData): Promise<Result<SessionLoggedIn, FeErrorClassed>> => {
  try {
    return Result.ok(await prisma.$transaction(async (tx) => {
      const sessionDeleteResult = await tx.session.deleteMany({
        where: {
          id: data.sid,
          userId: null,
        },
      });

      if (sessionDeleteResult.count === 0) {
        throw new FeErrorClassed('User is already logged in or (unlikely) session was deleted', 'login-1'); // unlikely
      }

      const user = await tx.user.findUnique({
        where: {
          email: data.user.email
        },
        select: {
          id: true,
          password: true,
        },
      })

      if (user === null) {
        throw new FeErrorClassed('User not found', 'login-user-not-found'); // expected by client
      }

      const passwordOk = await argon2.verify(user.password, data.user.password);
      if (!passwordOk) {
        throw new FeErrorClassed('Wrong password', 'login-wrong-password'); // expected by client
      }

      try {
        const newSid = await tx.session.create({
          data: {
            userId: user.id,
          },
          select: {
            id: true,
          },
        });

        return {
          id: newSid.id,
          userId: user.id
        };
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // foreign key constraint violation on field userId
          // [note] this happens when user is found (previous query) but then is deleted by som other "thread" before this query
          //        there is very small time time window between these queries so this situtation is really impropable
          //        could be fixed using 'select ... for update' in previous query (locking user row), but prisma doesn't support select ... for update (teda nenasiel som ze by to islo)
          if (e.code === 'P2003' && e.meta !== undefined && 'field_name' in e.meta && e.meta.field_name === 'Session_userId_fkey (index)') {
            throw new FeErrorClassed('Specified user not found', 'login-4'); // unlikely
          }
        }

        throw e;
      }
    }));
  } catch (e) {
    if (e instanceof FeErrorClassed) {
      return Result.err(e);
    } else {
      throw e;
    }
  }
}


export const logout = async (data: UUIDModel): Promise<Result<undefined, FeErrorClassed>> => {
  const sessionUpdateResult = await prisma.session.updateMany({
    where: {
      id: data.id,
      NOT: { userId: null },
    },
    data: {
      userId: null,
    },
  });

  if (sessionUpdateResult.count === 0) {
    return Result.err(new FeErrorClassed('User already logged out or (unlikely) session was deleted', 'logout-1')); // unlikely
  }

  return Result.ok(undefined);
}


type SignupData = {
  sid: string,
  user: {
    name: string,
    surname: string,
    email: string,
    password: string,
  },
};

export const signup = async (data: SignupData): Promise<Result<SessionLoggedIn, FeErrorClassed>> => {
  try {
    return Result.ok(await prisma.$transaction(async (tx) => {
      const sessionDeleteResult = await tx.session.deleteMany({      
        where: {
          id: data.sid,
          userId: null,
        },
      });
  
      if (sessionDeleteResult.count === 0) {
        throw new FeErrorClassed('User is already logged in or (unlikely) session was deleted', 'signup-1'); // unlikely
      }

      const passwordHashed = await argon2.hash(data.user.password);
  
      try {
        const userWithSessions = await tx.user.create({
          data: {
            name: data.user.name,
            surname: data.user.surname,
            email: data.user.email,
            password: passwordHashed,
            sessions: {
              create: [{}],
            },
            photo: 'no-photo',
            stars: 0,
          },
          select: {
            id: true,
            sessions: {
              select: {
                id: true,
              },
            },
          },
        });

        return { id: userWithSessions.sessions[0].id, userId: userWithSessions.id };
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002' && e.meta !== undefined && 'target' in e.meta && Array.isArray(e.meta.target) && e.meta.target.length === 1 && e.meta.target[0] === 'email') {
            throw new FeErrorClassed('Email is already used', 'signup-email-already-used'); // expected by client
          }
        }

        throw e;
      }
    }));
  } catch (e) {
    if (e instanceof FeErrorClassed) {
      return Result.err(e);
    } else {
      throw e;
    }
  }
}