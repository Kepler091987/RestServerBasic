const DBValidators  = require("./db-validators");
const GenerateJWT = require("./generate-jwt");
const GoogleVerify = require("./google-verify");

module.exports = {
    ...DBValidators,
    ...GenerateJWT,
    ...GoogleVerify
}
