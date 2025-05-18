import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thought = await Thought.find({});
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        if (!req.body) {
            return res.status(400).json({
                message: 'Bad request body!'
            });
        };
        const user = await User.findByIdAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        )
        return res.status(200).json({thought, user});
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getOneThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
        if (!thought) {
            return res.status(404).json({
                message: 'Thought ID not found'
            });
        };
        return res.status(200).json(thought);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const editOneThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({
                    message: 'No thought with that id!'
            });
        }
        return res.status(200).json(thought)
    } catch (error) {
        return res.status(500).json(error);
    }
}


export const deleteOneThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        };
        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({
                message: 'Application created but no user with this id!',
        });
      }
        return res.status(200).json({message: 'Successfully deleted!'});
    } catch (error) {
        return res.status(500).json(error);
        
    }
}

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { new: true }
        )
        if (!thought) {
            return res.status(404).json({
                message: 'No thought with this id!'
            })
        }
        return res.status(200).json(thought)
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        return res.status(200).json(thought)
    } catch (error) {
        return res.status(500).json(error);
    }
}
