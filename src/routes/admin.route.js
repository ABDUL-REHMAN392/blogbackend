import express from 'express'
import { deleteUser, getAllUsers } from '../controllers/admin.controller.js';
import { logoutUser } from '../controllers/user.controller.js';
export const adminRoute=express.Router();
adminRoute.get('/',getAllUsers)
adminRoute.post('/logout',logoutUser)
adminRoute.delete('/:id',deleteUser)
