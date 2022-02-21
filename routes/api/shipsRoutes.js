const express = require("express")
const router = express.Router()
const ship = require("../../controllers/Ship.controllers")

router.get("/", ship.get_all)
router.get("/:id", ship.get_one)
router.post("/", ship.add)
router.put("/:id", ship.update)
router.delete("/:id", ship.delete)

module.exports = router