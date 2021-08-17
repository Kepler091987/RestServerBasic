const { Router} = require('express');
const { check } = require('express-validator');
const { existCategoryForId } = require('../helpers')
const { validateFields, adminRole, validateJWT} = require('../middlewares');
const { categoryGet, showGet, categoryPost, categoryPut, categoryDelete } = require("../controllers/category.controller");

const router = Router();

router.get('/', categoryGet);
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existCategoryForId),
    validateFields
], showGet);
router.post('/',[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], categoryPost);
router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existCategoryForId),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], categoryPut);
router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existCategoryForId),
    adminRole,
    validateFields
], categoryDelete);

module.exports = router;
