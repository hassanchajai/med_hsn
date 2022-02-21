const express = require("express")
const router = express.Router()
const categorie = require("../../controllers/Categorie.controllers")

router.get("/", categorie.get_all)
router.get("/:id", categorie.get_one)
router.post("/", categorie.add)
router.put("/:id", categorie.update)
router.delete("/:id", categorie.delete)

module.exports = router