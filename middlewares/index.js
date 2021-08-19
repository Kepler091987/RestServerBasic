const fileValidate = require("./file-validate");
const validateFields  = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const validateRole = require("../middlewares/validate-roles");

module.exports = {
    ...fileValidate,
    ...validateFields,
    ...validateJWT,
    ...validateRole,
}
