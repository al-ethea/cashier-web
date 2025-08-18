export interface ICashier {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
  gender: EGender
  shift: EShiftSession | string
  avatarImgUrl: string
  cldPublicId: string
}

export enum EShiftSession {
  SHIFT1,
  SHIFT2
}

export enum EGender {
  Male,
  Female
}