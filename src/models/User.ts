import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: ObjectId[], // Array of Thoughts collection's _id's
    friends: ObjectId[] // Array of Users' _id's
}

const userSchema = new Schema<IUser> (
    {
        username: {
            type: String, 
            required: true, 
            unique: true
        },
        email: {
            type: String, 
            required: true, 
            unique: true, 
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

userSchema
    .virtual('friendCount')
    .get( function () {
        return this.friends.length;
    });

const User = model('user', userSchema)

export default User