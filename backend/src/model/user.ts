import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  username: string;
  hashedPassword?: string;
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
  serialize: () => { _id: string; username: string };
}

interface UserModel extends Model<IUser> {
  findByUsername: (username: string) => Promise<IUser> | null;
}

const UserSchema = new Schema<IUser, UserModel>({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password: string): Promise<void> {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model<IUser, UserModel>('User', UserSchema);

export default User;
