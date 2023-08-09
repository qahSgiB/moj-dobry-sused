import { UUIDModel } from "shared/types"



export type Session = UUIDModel & {
  userId: number | null,
}

export type SessionLoggedIn = UUIDModel & {
  userId: number,
}

export type SessionLoggedOut = UUIDModel;