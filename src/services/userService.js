import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UserService {
   //função para efetuar a criação de um novo usuario
  static async createUser({ name, phone, address, username, password }) {
    const usernameExisting = await prisma.user.findUnique({ where: { username: username } });
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;
    const validPassword = regexPassword.test(password);
    try {
      if (!validPassword || username.length < 3 || username.length > 20) {
        if (!validPassword) return { message: 'A senha não atende aos critérios de segurança.' };
        if (username.length < 3 || username.length > 20) return { message: 'Username precisa ter entre 3 e 20 caracteres.' };
      } else {
        if (!usernameExisting) {
          const newUser = await prisma.user.create({
            data: {
              name,
              phone,
              address,
              username,
              password: await bcrypt.hash(password, 10),
            },
          });
          const payload = { username, name, user_id: newUser.user_id };
          const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
          return { message: 'Usuario criado com sucesso', token, name: newUser.name };
        } else {
          return { message: 'Ocorreu um erro ao registrar o usuario, nome de usuario ja está em uso.' };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  //função para efetuar o login do usuario
  static async loginUser({ username, password }) {
    const usernameExisting = await prisma.user.findUnique({ where: { username: username } });
    try {
      if (usernameExisting) {
        const verifyPassword = await bcrypt.compare(password, usernameExisting.password);
        if (usernameExisting.username !== username || !verifyPassword) return { message: 'Credenciais inválidas.' };
        const payload = { username, user_id: usernameExisting.user_id };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        return { message: 'Login efetuado com sucesso.', token, name: usernameExisting.name };
      } else {
        return { message: 'Usuário não encontrado.' };
      }
    } catch (err) {
      return { message: 'Ocorreu um erro inesperado ao efetuar o login.' };
    }
  }
  //função para verificar se o token do usuario ainda e valido.
  static verifyToken(token){
    if(token){
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
      try{
        if(verifyToken){
          return {token}
        }
      }catch(err){
        console.log(err)
      }
    }
  }
}
