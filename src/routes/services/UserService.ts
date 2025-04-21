// src/services/UserService.ts
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserDoc, UserModel } from '@src/models/User';
import ENV from '@src/constants/ENV';
const UserService = {
  async getAll(): Promise<UserDoc[]> {
    return UserModel.find().exec();
  },

  async addOne(data: {
    name: string,
    email: string,
    passwordHash: string,
    isManager?: boolean,
  }): Promise<UserDoc> {
    return UserModel.create(data);
  },

  async updateOne(
    id: string,
    update: Partial<Pick<UserDoc, 'name'|'email'|'passwordHash'>>,
  ): Promise<void> {
    await UserModel.findByIdAndUpdate(new Types.ObjectId(id), update).exec();
  },

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
  },

  async login(email: string, password: string): Promise<{
    token: string,
    user: Omit<UserDoc, 'passwordHash'>,
  }> {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      throw new Error('Invalid credentials');
    }
    if (!user || typeof user.comparePassword !== 'function') {
      throw new Error('Invalid credentials');
    }
    const ok = await user.comparePassword(password);
    if (!ok) {
      throw new Error('Invalid credentials');
    }


    const token = jwt.sign(
      { sub: user._id.toHexString(), email: user.email },
      ENV.JwtSecret as jwt.Secret,
      { expiresIn: ENV.JwtExpiresIn as jwt.SignOptions['expiresIn'] },
    );

    const obj = user.toObject();

    const { passwordHash, ...safeUser } = obj;

    // Explicitly cast safeUser to the expected type
    const userWithoutPassword = safeUser as Omit<UserDoc, 'passwordHash'>;

    return { token, user: userWithoutPassword };
  },
};

export default UserService;
