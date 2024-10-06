const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken')



async function userSignInController(req, res){
    try{

        const { email, password } = req.body

        if(!email){
            throw new Error("Por favor, inserte su email")
        }
        if(!password){
            throw new Error("Por favor, inserte su contraseña")
        }

        const user = await userModel.findOne({email})

        if(!user){
            throw new Error("El usuario no esta registrado")
        }

        // Verificar si el usuario está bloqueado
        if (user.status === 'Bloqueado') {
            throw new Error("Su cuenta está bloqueada.");
        }

        const checkPassword = await bcrypt.compare(password,user.password)

       console.log("checkPassoword",checkPassword)

       if(checkPassword){
        const tokenData = {
            _id : user._id,
            email : user.email,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

        const tokenOption = {
            httpOnly : true,
            secure : true,
            sameSite : 'none'
        }

        res.cookie("token",token,tokenOption).status(200).json({
            message : "Inicio de sesion exitoso",
            data : token,
            success : true,
            error : false
        })
         }else{
            throw new Error("Contraseña incorrecta")
        }

    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }

}

module.exports = userSignInController