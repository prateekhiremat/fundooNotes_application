import { Schema,model } from "mongoose";

const noteSchema = new Schema(
    {
        title:{
            type: String
        },
        discription:{
            type: String
        },
        color:{
            type: String
        },
        isArchived:{
            type: Boolean,
            default: false
        },
        isTrashed:{
            type: Boolean,
            default: false
        },
        createdBy:{
            type: Schema.Types.ObjectId,
            ref: 'User', // Name of the referenced model
        }
    },
    {
        timestamps: true
    }
);

export default model('Note', noteSchema);