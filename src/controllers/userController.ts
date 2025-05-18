import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        if (!req.body) {
            return res.status(400).json({
                message: 'Bad request body!'
            });
        };
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getOneUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({_id: req.params.userId});
        if (!user) {
            return res.status(404).json({
                message: 'User ID not found'
            });
        };
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const editOneUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        };
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error);
    }
}


export const deleteOneUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.userId});
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        };
        // TODO delete thoughts from this user too
        await Thought.deleteMany({_id: { $in: user.thoughts }})
        return res.status(200).json({message: 'Successfully deleted!'});
    } catch (error) {
        return res.status(500).json(error);
        
    }
}

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        };
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull : { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        };
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}
