const {request, response} = require("express");
const fileValidate = (req = request, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({msg: 'No se encontro ningun archivo'});
    }
    next();
}

module.exports = {
    fileValidate
}
