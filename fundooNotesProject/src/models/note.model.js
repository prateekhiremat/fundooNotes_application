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
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default model('Note', noteSchema);