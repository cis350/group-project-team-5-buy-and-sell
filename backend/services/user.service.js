import { hash } from 'bcrypt';
import { User } from '../models/user.model';

const passwordHashSaltRounds = 10;

const createUser = async (
    firstName,
    lastName,
    email,
    password,
    role
  ) => {
    const hashedPassword = await hash(password, passwordHashSaltRounds);
    if (!hashedPassword) {
      return null;
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });
    const user = await newUser.save();
    return user;
  };


const getUserByEmailWithPassword = async (email) => {
    const user = await User.findOne({ email })
      .select()
      .exec();
    return user;
};


export {
    passwordHashSaltRounds,
    createUser,
    getUserByEmailWithPassword
}
