const { request, response } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");


const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: " Usuario / Password no son incorrectos"
            });
        }

        // Verificar si el usuario esta activo
        if(!user.active){
            return res.status(400).json({
                msg: " Usuario / Password no son incorrectos"
            });
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword){
            return res.status(400).json({
                msg: " Usuario / Password no son incorrectos"
            });
        }

        // Generar JWT
        const token = await generateJWT(user._id);

        res.json({
            user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Se encontro un error, comuniquese con el administrador'
        });
    }
};

module.exports = {
        login
};
