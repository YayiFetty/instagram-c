
import { Cloudinary } from '@cloudinary/url-gen';
import { upload } from 'cloudinary-react-native';
import { UploadApiResponse } from 'cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params';

const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  },
});

// Check if the cloudName is being passed correctly
console.log("passed correctly",cloudName);

export const uploadImage = async (file:string) => {
   

  const options = {
    upload_preset: "Default",
    unsigned: true,
  };

  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    await upload(cld, {
      file,
      options: options,
      callback: (error, response) => {
        //.. handle response

        if (error || !response) {
          reject(error);
        } else {
          resolve(response);
        }

        // console.log("error", error);
        // console.log("response", response?.public_id);
      },
    });
  });
};

