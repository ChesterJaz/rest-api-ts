import { auhtorized, isOwner } from './../middlewares/index';
import express from 'express';

import { deleteID, getAllUsers, updateUser } from '../controllers/users';


export default (router: express.Router) =>{
    router.get('/users', auhtorized, getAllUsers);
    router.delete('/users/:id/', auhtorized, isOwner, deleteID);
    router.patch('/users/:id', auhtorized, isOwner, updateUser);
}