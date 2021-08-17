const { request, response } = require('express');
const { Category } = require('../models');


const categoryGet = async (req, res = response) => {
    const { limit = 5, page = 1 } = req.query;
    let from = (page - 1) * limit;


    const [ total, categories ] = await Promise.all([
        Category.countDocuments({active:true}),
        Category.find({active:true})
            .limit(Number(limit))
            .populate('user', 'name')
            .skip(Number(from))
    ]);

    res.json({
        total,
        categories
    })
};

const showGet = async (req = request, res = response) => {
    const id = req.params.id;
    const [ category ] = await Promise.all([
        Category.findById(id)
            .populate('user', 'name')
    ]);

    res.json({
        category
    })
}

const categoryPost = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    const user = req.user;
    const categoryDB = await Category.findOne({name});
    if(categoryDB){
        return res.status(400).json({
            ok: `La categoria ${categoryDB.name}, ya existe`
        })
    }

    //Generar data a Guardar
    const data = {
        name,
        user: user._id
    }

    const category = new Category(data);
    await category.save();
    res.status(201).json({
        category
    });
}

const categoryPut = async ( req = request, res = response) => {
    const id = req.params.id;
    const name = req.body.name.toUpperCase();
    const user = req.user;
    const categoryDB = await Category.findOne({name});
    if(categoryDB){
        return res.status(400).json({
            ok: `La categoria ${categoryDB.name}, ya existe`
        })
    }

    //Generar data a Guardar
    const data = {
        name,
        user: user._id
    }

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json({
        category
    });
}

const categoryDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const category = await Category.findByIdAndUpdate(id, {active:false}, {new: true});

    res.status(200).json({
        category
    });
}

module.exports = {
    categoryGet,
    showGet,
    categoryPost,
    categoryPut,
    categoryDelete
}
