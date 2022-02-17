const express = require('express');
const router = express();
const reservation  = require('../routes/Api/reservations.routes');
const role = require('../routes/Api/roles.routes');
const ship = require('../routes/Api/ship.routes');
const user = require('../routes/Api/users.routes')

router.use("/user/", user)
router.use("/role/", role)
router.use("/ship/", ship)
router.use("/reservation/", reservation)



module.exports = router