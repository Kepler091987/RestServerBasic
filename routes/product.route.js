const { Router} = require('express');
const { check } = require('express-validator');
const { existProductForId, existCategoryForId } = require('../helpers')
const { validateFields, adminRole, validateJWT} = require('../middlewares');
const { productGet, showGet, productPost, productPut, productDelete } = require("../controllers/product.controller");

const router = Router();

router.get('/', productGet);
router.get('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existProductForId),
    validateFields
], showGet);
router.post('/',[
    validateJWT,
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    check('category', 'No es un id de categoria valido').isMongoId(),
    check('category').custom(existCategoryForId),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], productPost);
router.put('/:id', [
    validateJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existProductForId),
    validateFields
], productPut);
router.delete('/:id', [
    validateJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existProductForId),
    adminRole,
    validateFields
], productDelete);

module.exports = router;
