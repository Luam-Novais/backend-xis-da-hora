import UserService from "../services/userService.js"

export default  class userController{
    static async createUser(req, res){
        const {name, phone, address, username  , password} = req.body
        if( name  &&  phone &&  address &&  username  &&   password ){
            const user = await UserService.createUser({name, phone, address, username, password})
            if(!user.token) res.status(400).json(user)
            res.status(201).json({message: 'Usuario criado com sucesso.', token: user.token})
        } else{
            return res.status(400).json({message: 'falha ao criar usuario, verifique os dados.'}) 
        }
    }
    static async getInfosUser(req, res){
        
    }
}