const { request, response } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');


const userGet = async (req, res = response) => {

    const { limit = 5, page = 1 } = req.query;
    let from = (page - 1) * limit;

    // const users = await User.find({active:true})
    //     .limit(Number(limit))
    //     .skip(Number(from));
    //
    // const total = await User.countDocuments({active:true});

    const [ total, users ] = await Promise.all([
        User.countDocuments({active:true}),
        User.find({active:true})
            .limit(Number(limit))
            .skip(Number(from))
    ]);

    res.json({
        total,
        users
    })
}

const userPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({name, email, password, role});
    // Verificar Email si existe


    // Encriptar contraseñana
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en Base de datos
    await user.save();

    res.json({
        user
    })
}

const userPut = async ( req = request, res = response) => {
    const id = req.params.id;
    const { _id, password, google, role, ...rest } = req.body;

    //  validar Contra base de datos
    if(password){
        // Encriptar contraseñana
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const [user] = await Promise.all([
        User.findByIdAndUpdate(id, rest)
    ]);

    res.json({
        user
    })
}

const userDelete = async (req, res = response) => {
    const id = req.params.id;

    //Fisico delete
    // const user = await User.findByIdAndDelete(id);

    const [user] = await Promise.all([
        User.findByIdAndUpdate(id,{active:false})
    ]);
    res.json({
        user
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}
