 
 
 
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable max-len */
 
 
import {
  Schema,
  model,
  Model,
  HydratedDocument,
} from 'mongoose';

import { compare, hash } from 'bcrypt';
export interface IUser {
    name: string;
    email: string;
    passwordHash: string;
    isManager?:boolean;
  }

export interface IUserMethods {
    comparePassword(plain: string): Promise<boolean>;
}
  
export type UserDoc = HydratedDocument<IUser, IUserMethods>;

const userSchemaDef = {
  name:         { type: String, required: false, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  isManager:    { type: Boolean, required: false , default:false },
} as const;
  
export type UserModelType = Model<IUser, {}, IUserMethods>;
  
const UserSchema = new Schema<IUser, UserModelType>(
  userSchemaDef,
  { timestamps: true },
);

// auto‑hash passwordHash when it’s set/modified
UserSchema.pre('save', async function () {
  if (this.isModified('passwordHash')) {
    this.passwordHash = await hash(this.passwordHash, 10);
  }
});
  

UserSchema.methods.comparePassword = function (plain: string) {
  return compare(plain, this.passwordHash as string);
};


export const UserModel = model<IUser, UserModelType>('User', UserSchema);
  