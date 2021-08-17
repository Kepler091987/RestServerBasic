const { Schema, model } = require('mongoose');

const CategorySchema =  Schema({
    name: {
        type: String,
        unique: true,
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
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, active, ...category } = this.toObject();
    return category;
}

module.exports = model('Category',  CategorySchema);
