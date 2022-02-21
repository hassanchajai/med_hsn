const express = require("express")
const router = express.Router()
const rdv = require("../../controllers/Rdv.controllers")

router.get("/", rdv.get_all)
router.get("/:id", rdv.get_one)
router.post("/", rdv.add)
router.put("/:id", rdv.update)
router.delete("/:id", rdv.delete)

module.exports = router