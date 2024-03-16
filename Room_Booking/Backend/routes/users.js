const express = require("express");
const router = express.Router();
const allFunc = require("../controller/users");
const allFunc2 = require("../utils/verifyToken");

//new user
router.route('/').post(allFunc.createUser)
//update
router.route('/:id').put(allFunc2.verifyUser,allFunc.updateUser);
//delete by ID
 router.delete('/:id',allFunc2.verifyUser,allFunc.deleteUser);
//get by ID
router.get('/:id', allFunc2.verifyUser,allFunc.getbyId)
//get all
router.route('/').get(allFunc2.verifyAdmin,allFunc.getAll)
module.exports = router;
