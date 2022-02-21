const express = require("express")
const router = express.Router()
const reservs = require("../../controllers/Reservation.controllers")

router.get("/", reservs.get_all)
router.get("/:id", reservs.get_one)
router.post("/", reservs.reserve)


module.exports = router