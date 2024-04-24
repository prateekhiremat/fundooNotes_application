import { type } from "@hapi/joi/lib/extend";
import { Schema,model } from "mongoose";

const noteSchema = new Schema(
    {
        title:{
            type:String
        },
        color:{
            type:String
        },
        isArchived:{
            type:Boolean
        },
        isTrashed:{
            type:Boolean
        },
        createdBy:{
            type:String
        }
    },
    {
        timestamps: true
    }
);

export default model('Note', noteSchema);