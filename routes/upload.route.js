const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, fileValidate } = require("../middlewares");
const { allowedCollections } = require("../helpers");
const { fileUpload, updatedFile, imageShow } = require('../controllers/upload.controller');


const router = Router();

router.post('/', [
    fileValidate,
    validateFields
], fileUpload);

router.put('/:collection/:id', [
    fileValidate,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], updatedFile);

router.get('/:collection/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], imageShow);

module.exports = router;
