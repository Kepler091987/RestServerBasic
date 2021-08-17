const { request, response } = require('express');
const { Product } = require('../models');


const productGet = async (req, res = response) => {
    const { limit = 5, page = 1 } = req.query;
    let from = (page - 1) * limit;


    const [ total, products ] = await Promise.all([
        Product.countDocuments({active:true}),
        Product.find({active:true})
            .limit(Number(limit))
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
    ]);

    res.json({
        total,
        products
    })
};

const showGet = async (req = request, res = response) => {
    const id = req.params.id;
    const [ product ] = await Promise.all([
        Product.findById(id)
            .populate('user', 'name')
    ]);

    res.json({
        product
    })
}

const productPost = async (req = request, res = response) => {
    const { active, user, ...body} = req.body;
    const productDB = await Product.findOne({name:body.name});
    if(productDB){
        return res.status(400).json({
            ok: `El producto ${productDB.name}, ya existe`
        })
    }

    //Generar data a Guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product(data);
    await product.save();
    res.status(201).json({
        product
    });
}

const productPut = async ( req = request, res = response) => {
    const id = req.params.id;
    const { active, user, ...body} = req.body;
    if (body.name){
        body.name = body.name.toUpperCase();
        const productDB = await Product.findOne({name:body.name});
        if(productDB){
            if(productDB._id != id){
                return res.status(400).json({
                    ok: `El producto ${productDB.name}, ya existe`
                });
            }
        }
    }
    body.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, body, {new: true})
        .populate('user', 'name')
        .populate('category', 'name');

    res.status(200).json({
        product
    });
}

const productDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const product = await Product.findByIdAndUpdate(id, {active:false}, {new: true})
        .populate('user', 'name')
        .populate('category', 'name');

    res.status(200).json({
        product
    });
}

module.exports = {
    productGet,
    showGet,
    productPost,
    productPut,
    productDelete
}
