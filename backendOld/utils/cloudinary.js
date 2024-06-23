import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
  cloud_name: 'dmtwtybji', 
  api_key: '457462423388456', 
  api_secret: 'wk0EVUJ6_vYdWBFvvfvMntLUMCU' 
});


const uploadOnCloudinary = async (localFilePath, publicId) => {
    try {
        if (!localFilePath) return null;

        // Create the options object
        let options = {
            resource_type: "auto",
        };

        // Conditionally add public_id to the options
        if (publicId) {
            options.public_id = publicId;
        }

        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, options);

        // File has been uploaded successfully
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file

        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



const destroyOnCloudinary = async (publicId)=>{
    try{
        const res = await cloudinary.uploader.destroy(publicId);
        return res;
    }catch(err){
        return err;
    }
}






export {uploadOnCloudinary,destroyOnCloudinary}