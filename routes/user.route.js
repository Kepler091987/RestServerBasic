const { Router} = require('express');
const { userGet, userDelete, userPut, userPost} = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validateFields } = require("../middlewares/validate-fields");
const { roleValidate, existEmail, existUserForId } = require("../helpers/db-validators");

const router = Router();

router.get('/', userGet);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength({min:8}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existEmail),
    // check('role', 'No es un Rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(roleValidate),
    validateFields
], userPost);
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userPut);
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userDelete);

module.exports = router;
