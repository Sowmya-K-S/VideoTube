import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname:
        {
            type: String,
            required: true,
            trim: true, 
            index: true,
        },
        avatar:
        {
            type: String, //cloudinary URL
            required: true,
        },
        coverImage:
        {
            type: String, //cloudinary URL
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: 
        {
            type: String,
            required: [true, "password is required"]
        },
        refreshToken:
        {
            type: String
        }

    },
    { timestamps: true }
)

//to encrypt the password before saving it to database
// using prehook
userSchema.pre("save",async function (next)
{   
    if(this.modified("password")) return next() 

    this.password = bcrypt.hash(this.password, 10)

    next()
})


//writing our own middleware

//to check if password in correct or not
userSchema.methods.isPasswordCorrect = async function(password){
// here bcrypt will encrypt the incoming password and compare it with encrypted password in database.
 return await bcrypt.compare(password, this.password) 
}

//to generate access token
userSchema.methods.generateAccessToken = function(){
    //short lived access token (JWT)
    return jwt.sign({
        id_ : this._id,
        email : this.email,
        username : this.username,
        fullname : this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );
}


//to generate refresh token
userSchema.methods.generateRefreshToken = function(){
    //short lived access token (JWT)
    return jwt.sign({
        id_ : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    );
}

//to create a document in mongoose
export const User = mongoose.model("User", userSchema)