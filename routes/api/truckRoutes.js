const express = require("express")
const router = express.Router()
const truck = require("../../controllers/Truck.controllers")

router.get("/", truck.get_all)
router.get("/:id", truck.get_one)
router.post("/", truck.add)
router.put("/:id", truck.update)
router.delete("/:id", truck.delete)
 
module.exports = router