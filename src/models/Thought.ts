import { Schema, model, Document } from 'mongoose';
import Reaction from './Reaction.js'

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: typeof Reaction[],
}

const thoughtSchema = new Schema<IThought> (
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date, 
            default: Date.now(), // dd/mm/yyyy
        },
        username: {
            type: String, 
            required: true, 
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true
        },

        id: false
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get( function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema)

export default Thought