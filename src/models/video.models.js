import mongoose, { Schema } from "mongoose";

//"mongoose-aggregate-paginate" :
//mongoose-aggregate-paginate to run aggregation pipeline queries on database
// plugin is used as aggregation pipelines were introduced very late and are not directly included in mongoDB
//so, now they act as plugin and help in writing longer aggregaqtion pipeline queries
// importing the package


import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile:
        {
            type: String, //cloudinary URL
            required: true,   
        },
        thumbnail:
        {
            type: String, //cloudinary URL
            required: true,
        },
        title:
        {
            type: String,
            required: true,
        },
        description:
        {
            type: String,
            required: true,
        },
        duration:
        {
            type: Number,
            required: true,
        },
        views:
        {
            type: Number,
            default: 0,
        },
        isPublished:
        {
            type: Boolean,
            default: true,
        },
        owner: 
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)
//including the mongoose-aggregate-paginate to schema
videoSchema.plugin(mongooseAggregatePaginate)

//exporting schema
export const Video = mongoose.model("Video", videoSchema) 
