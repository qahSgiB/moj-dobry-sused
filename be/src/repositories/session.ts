import prisma from "../client";

import { UUIDModel } from "shared/types";



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