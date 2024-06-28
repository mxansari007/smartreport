import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SCRET,
});

const uploadOnCloud = async(localFilePath) => {
    try {
        
        if(!localFilePath){
            return null;
        }

        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("File Uploaded successfully: ", uploadResult.url);

        fs.unlinkSync(localFilePath);
        return uploadResult;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
        
    }
}

const deleteFromCloud = async(url) => {
    try {
        if( !url ){
            return null;
        }

        const id = findPublicId(url);

        const deleteResult = await cloudinary.uploader.destroy(id, {
            resource_type: "image"
        });

        if(deleteResult.result === "ok"){
            console.log("file deleted successfully");
            return true;
        }

        return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

const findPublicId = (url) => {
    const parsedPath = path.parse(url);
    return parsedPath.name;
}

export {
    uploadOnCloud,
    deleteFromCloud
};