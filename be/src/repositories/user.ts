import { Result } from "@badrap/result"
import prisma from "../client"

import { IdModel } from "shared/types"

import { FeErrorClassed } from "../types"



type DebugProfileResult = {
  name: string,
  surname: string,
}

export const debugProfile = async (data: IdModel): Promise<Result<DebugProfileResult, FeErrorClassed>> => {
  const user = await prisma.user.findUnique({
    where: {
      id: data.id,
    },
    select: {
      name: true,
      surname: true,
    },
  });

  if (user === null) {
    return Result.err(new FeErrorClassed('User doesn\'t exists', 'debug-profile-1')); // unlikely
  }

  return Result.ok(user);
}