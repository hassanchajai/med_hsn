
const express=require('express')
const router=express.Router()
const apiRouter = require('./api/index');

router.use("/api/v1",apiRouter);

module.exports=router