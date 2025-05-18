import { Router } from "express";
const router = Router()

import { getUsers, createUser, getOneUser, editOneUser, deleteOneUser, addFriend, removeFriend } from '../../controllers/userController.js'

// http://localhost:3001/api/users
router.route('/')
    .get(getUsers)
    .post(createUser)

// http://localhost:3001/api/users/:userId
router.route('/:userId')
    .get(getOneUser)
    .put(editOneUser)
    .delete(deleteOneUser)

// http://localhost:3001/api/users/:userId/friends

// http://localhost:3001/api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend) // a single friend in the body
    .delete(removeFriend)


export default router