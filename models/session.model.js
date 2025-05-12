import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    videoUrl : {
        type : String,
        required : true
    },
    chats : [
        {
        sender : {
            type : String,
            enum : ["user", "assistant"]
        },
        message : String
        }
    ]
},
{
    timestamps : true
}
)

const Session = mongoose.model("Session", SessionSchema)

export default Session