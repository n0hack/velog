import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUser {
  id: string;
  username: string;
  hashedPassword?: string;
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
  serialize: () => { _id: string; username: string };
  generateToken: () => string;
}

interface UserModel extends Model<IUser> {
  findByUsername: (username: string) => Promise<IUser> | null;
}

const UserSchema = new Schema<IUser, UserModel>({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function (
  password: string,
): Promise<void> {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (
  password: string,
): Promise<boolean> {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this.id, username: this.username },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' },
  );
  return token;
};

UserSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username });
};

const User = mongoose.model<IUser, UserModel>('User', UserSchema);

export default User;
