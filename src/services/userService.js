import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UserService {
  static async createUser({ name, phone, address, username, password }) {
    const usernameExisting = await prisma.user.findUnique({ where: { username: username } });
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;
    const validPassword = regexPassword.test(password);
    try {
      if (!validPassword || username.length < 3 || username.length > 20) {
        return { message: 'Ocorreu um erro ao registrar o usuario, verfique os formato permitido dos dados.' };
      } else {
        if (!usernameExisting) {
          await prisma.user.create({
            data: {
              name,
              phone,
              address,
              username,
              password: await bcrypt.hash(password, 10),
            },
          });
          const payload = { username, name };
          const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
          return { message: 'Usuario criado com sucesso', token };
        } else {
          return { message: 'Ocorreu um erro ao registrar o usuario, nome de usuario ja está em uso.' };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
