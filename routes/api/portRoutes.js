const express = require("express")
const router = express.Router()
const port = require("../../controllers/Port.controllers")

router.get("/", port.get_all)
router.get("/:id", port.get_one)
router.post("/", port.add)
router.put("/:id", port.update)
router.delete("/:id", port.delete)

module.exports = router