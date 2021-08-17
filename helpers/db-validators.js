const Role = require("../models/role.model");
const User = require("../models/user.model");
const { Category, Product } = require("../models");


const roleValidate = async (role = '') => {
    const existRole = await Role.findOne({role});
    if (!existRole){
        throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
}

const existEmail = async (email = '') => {
    const existEmail = await User.findOne({email});
    if (existEmail){
        throw new Error(`El correo ${email} ya esta registrado en la base da datos`);
    }
}

const existUserForId = async (id) => {
    const existUser = await User.findById(id);
    if (!existUser){
        throw new Error(`El id ${id} no representa a un usuario  en la base da datos`);
    }
}

const existCategoryForId = async (id) => {
    const existCategory = await Category.findById(id);
    if(!existCategory){
        throw new Error(`el id ${id} no representa una categoria en la base de datos`)
    }
}

const existProductForId = async (id) => {
    const existProduct = await Product.findById(id);
    if(!existProduct){
        throw new Error(`el id ${id} no representa un producto en la base de datos`)
    }
}


module.exports = {
    roleValidate,
    existEmail,
    existUserForId,
    existCategoryForId,
    existProductForId
}
