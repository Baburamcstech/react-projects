const express=require('express');
const router=express.Router();
const Hotel =require('../models2/hotel');
const allFunc2 =require('../utils/verifyToken');
const allFunc =require('../controller/hotel');

router.route('/:id').post(allFunc2.verifyAdmin,allFunc.createHotel)
//update
router.route('/:id').put(allFunc2.verifyAdmin,allFunc.updateHotel);
//delete by ID
 router.delete('/:id',allFunc2.verifyAdmin,allFunc.deleteHotel);
//get by ID
router.route('/:id').get(allFunc.getbyId)
//get all
router.route('/').get(allFunc.getAll)
module.exports = router;