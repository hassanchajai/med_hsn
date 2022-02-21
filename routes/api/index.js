const express=require('express')
const router=express.Router()
const userRoutes = require('./userRoutes');
const portRoutes = require('./portRoutes');
const quaisRoutes = require('./quaisRoutes');
const rdvRoutes = require('./rdvRoutes');
const reservationRoutes = require('./reservationRoutes');
const shipRoutes = require('./shipsRoutes');
const truckRoutes = require('./truckRoutes');

router.get("/",(req,res)=>{
    return res.json({
        message:"welcome in cj api !"
    })
});

router.use("/users",userRoutes);
router.use("/ports",portRoutes);
router.use("/quais",quaisRoutes);
router.use("/rdv",rdvRoutes);
router.use("/resevations",reservationRoutes);
router.use("/ships",shipRoutes);
router.use("/trucks",truckRoutes);

module.exports=router