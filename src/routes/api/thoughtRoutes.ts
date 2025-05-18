import { Router } from "express";
const router = Router()

import { getThoughts, createThought, getOneThought, editOneThought, deleteOneThought, addReaction, removeReaction } from '../../controllers/thoughtController.js'

// http://localhost:3001/api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought)

// http://localhost:3001/api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getOneThought)
    .put(editOneThought)
    .delete(deleteOneThought)
    
    // http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)
    
router.route('/:thoughtId/reactions')    
    .post(addReaction) // a single reaction in the body

export default router