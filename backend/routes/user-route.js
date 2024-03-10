import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
} from '../controllers/user-controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getAllChapters } from '../controllers/chapterController.js';

const router = express.Router();
// Routes for user
router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers); 
router.get('/:userId', getUser);
//Route for chapter
router.get("/:userId/chapters", getAllChapters);


export default router;