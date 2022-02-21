const express = require("express")
const router = express.Router()
const quais = require("../../controllers/Quais.controllers")

router.get("/", quais.get_all)
router.get("/:id", quais.get_one)
router.post("/", quais.add)
router.put("/:id", quais.update)
router.delete("/:id", quais.delete)

module.exports = router