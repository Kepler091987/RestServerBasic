const { request, response } = require("express");


const validateRole = async (req = request, res = response, next) => {
    const { role, name } = req.user;
    if(!req.user){
        return res.status(500).json({
            msg: 'No se puede validar el usuario sin validar el token'
        });
    }
    if(role != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El Usuario ${name} no tiene permiso para eliminar usuarios`
        });
    }
    next();
};

module.exports = {
    validateRole
}
