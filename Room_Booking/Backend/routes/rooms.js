const express=require('express');
const router=express.Router();
router.route('/').get((req,res)=>{
    res.send("Hello ,this is auth endpoint")
})
module.exports = router;