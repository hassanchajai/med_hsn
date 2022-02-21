const express=require('express')
const router=express.Router()
const userRoutes = require('./userRoutes');
const portRoutes = require('./portRoutes');
const quaisRoutes = require('./quaisRoutes');
const rdvRoutes = require('./rdvRoutes');
const reservationRoutes = require('./reservationRoutes');
const shipRoutes = require('./shipsRoutes');
const truckRoutes = require('./truckRoutes');
const categorieRoutes = require('./categorieRoutes');
const { protect } = require('../../controllers/authController');

router.get("/",(req,res)=>{
    return res.json({
        message:"welcome in cj api !"
    })
});

router.use("/users",userRoutes);
router.use("/ports",protect,portRoutes);
router.use("/quais",protect,quaisRoutes);
router.use("/rdv",protect,rdvRoutes);
router.use("/reservations",protect,reservationRoutes);
router.use("/ships",protect,shipRoutes);
router.use("/trucks",protect,truckRoutes);
router.use("/categories",protect,categorieRoutes);

module.exports=router