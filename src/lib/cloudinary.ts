
import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  },
});

// Check if the cloudName is being passed correctly
console.log("passed correctly",cloudName);


