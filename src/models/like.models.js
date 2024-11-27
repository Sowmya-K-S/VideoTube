import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        //like can belong to either video, tweet or comment

        video:
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
        tweet:
        {
            type: Schema.Types.ObjectId,
            ref: "Tweet",
        },
        comment:
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        likedBy:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {

    }
)

export const Like = mongoose.model("Like",likeSchema)
