const { Schema, model } = require('mongoose');

const UserSchema =  Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    active: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User',  UserSchema);
