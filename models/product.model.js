const { Schema, model } = require('mongoose');

const ProductSchema =  Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    active: {
        type: Boolean,
        default: true,
        required: [true, 'El activo es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio']
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'La categoria es obligatorio']
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, active, ...product } = this.toObject();
    return product;
}

module.exports = model('Product',  ProductSchema);
