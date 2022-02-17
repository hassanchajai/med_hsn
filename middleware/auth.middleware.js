const { verifyToken } = require('../helpers/JwtValidation');

const AdminAuth = (req, res, next) => {
  verifyToken(req, res, next, 'admin');
}
const deliveryManager = (req, res, next) => {
  verifyToken(req, res, next, 'deliveryManger');
};
const managerAuth = (req, res, next) => {
  verifyToken(req, res, next, 'manager');
};

const others = (req, res, next) => {
  verifyToken(req, res, next, 'others');
};
module.exports = {
  AdminAuth,
  deliveryManager,
  managerAuth,
  others
};