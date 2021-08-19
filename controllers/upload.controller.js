const {request, response} = require("express");
const { fileUpload: fileUploadHelper } = require("../helpers");
const { Product, User } = require('../models');
const path = require("path");
const fs = require("fs");


const fileUpload = async (req = request, res = response) => {

    try{
        // const name = await fileUploadHelper(req.files, ['txt', 'md'], 'textos');
        const name = await fileUploadHelper(req.files, undefined, 'images');
        res.json({
            name
        });
    } catch (msg) {
        res.status(400).json({
            msg
        });
    }
}

const updatedFile = async (req= request, res=response) =>{
    const { id, collection } = req.params;
    let model;
    switch (collection){
        case 'users':
            model = await User.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido Validar esto'});
    }

    // Limpiar imagenes previas
    try{
        if(model.image){
            // Borrar imagen servidor
            const pathImage = path.join(__dirname, '../uploads/', collection, model.image);
            if(fs.existsSync(pathImage)){
                fs.unlinkSync(pathImage);
            }
        }
    } catch (e) {

    }


    const name = await fileUploadHelper(req.files, undefined, collection);
    model.image = name;
    await model.save();

    res.json({
        model
    });

}

const imageShow = async (req= request, res= response) => {
    const { collection, id } = req.params;
    let model;
    switch (collection){
        case 'users':
            model = await User.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido Validar esto'});
    }

    try{
        if(model.image){
            const pathImage = path.join(__dirname, '../uploads/', collection, model.image);
            if(fs.existsSync(pathImage)){
                return res.sendFile(pathImage);
            }
        }
    } catch (e) {

    }
    const pathPlaceholder = path.join(__dirname, '../assets/images/no-image.jpg');
    res.sendFile(pathPlaceholder);
}

module.exports = {
    fileUpload,
    updatedFile,
    imageShow
}
