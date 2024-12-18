import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

//cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//upload on cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = cloudinary.uploader.upload( localFilePath, {
            resource_type : "auto"
        })

        console.log("File uploaded on cloudinary. \n File src : "+ response.url)

        //after file is uploaded, we would like to delete it from our server.
        fs.unlinkSync(localFilePath)

        //throwing away the response - we may reuse this later.
        return response;
        
    } catch (error) {
        //If the file upload fails, then we will have to remove it from local storage as well
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}