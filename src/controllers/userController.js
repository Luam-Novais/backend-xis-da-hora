import UserService from "../services/userService.js"
export default  class userController{
   
    static async createUser(req, res){
        const {name, phone, address, username  , password} = req.body
        if( name  &&  phone &&  address &&  username  &&   password ){
            const user = await UserService.createUser({name, phone, address, username, password})
            if(!user.token) res.status(400).json(user.message)
            res.status(201).json({message: 'Usuario criado com sucesso.', token: user.token, name: user.name})
        } else{
            return res.status(400).json({message: 'falha ao criar usuario, verifique os dados.'}) 
        }
    }
    
    static async loginUser(req, res){
        const {username, password} = req.body
        if(!username || !password ) res.status(400).json({message: 'Informe os dados necessários para efetuar o login.'})
        const user = await UserService.loginUser({username, password})
        if(!user.token) res.status(400).json({message: user.message})
        res.status(200).json({message: user.message, token:user.token, name: user.name})
    }
    
    static verifyToken(req, res) {
        const tokenHeader = req.headers.authorization.split(' ')[1]
        if(!tokenHeader) res.status(400).json({message: 'token não informado.'})
        const verifieldToken = UserService.verifyToken(tokenHeader)
        if(!verifieldToken) res.status(400).json({message: 'token não valido, efetue um novo login.'})
        res.status(200).json({token: verifieldToken})
    }
}