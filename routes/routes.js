import express from "express";
import { signupUser } from "../controller/user-controller.js";
import { loginUser } from "../controller/user-controller.js";
import { fileUpload,getImage } from "../controller/ima_controller.js";
import upload from "../utils/upload.js";
import { createPost,Allpost,Posti,updatePost,deletePost} from "../controller/post_controller.js";
import { newComment,getComments,deleteComment} from "../controller/comment_controller.js";
import { authenticateToken } from "../controller/jwt_controller.js";
const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/file/upload',upload.single('file'),fileUpload);
router.get('/file/:filename',getImage);
router.post('/create',authenticateToken,createPost);
router.get('/post',authenticateToken,Allpost);
router.get('/postid/:id',authenticateToken,Posti)
router.put('/updatepost/:id',authenticateToken,updatePost)
router.delete('/delete/:id',authenticateToken,deletePost)
router.post('/comment',authenticateToken,newComment)
router.get('/comments/:id',authenticateToken,getComments)
router.delete('/comment/delete/:id',authenticateToken,deleteComment)
//router.get('/searc', authenticateToken, searchPosts);
export default router;
