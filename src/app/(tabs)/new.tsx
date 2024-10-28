import React, { useEffect, useState } from 'react'
import { Image, Pressable, Text, TextInput, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Button from '@/src/components/Button';
import { upload } from 'cloudinary-react-native';
import { cld } from '@/src/lib/cloudinary';

export default function CreatePost() {
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState<string | null>(null);


  useEffect(() => {
    if(!image){
      pickImage();
    }
  }, [image])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
      if(!image){
        return;
      }

      const options = {
        upload_preset: 'Default',
        unsigned: true,
    }
    
    await upload(cld, {
      file: image,
       options: options, 
       callback: (error: any, response: any) => {
        //.. handle response

        console.log("error", error);
        console.log("response", response);
    }})
  }
  const createPost = async () => {
    await uploadImage(image);
  }
  return (
    <View className=' p-3 items-center flex-1'>
        {/* image picker */}
      {
        image ? (  <Image source={{uri: image}}
          className='w-52 aspect-[3/4] rounded-lg shadow-md bg-slate-300'/>)
          : (<View className='w-52 aspect-[3/4] rounded-lg shadow-md bg-slate-300'/>)
      }
        <Text onPress={pickImage} className='text-blue-500 font-semibold m-5'>
            Change
        </Text>

        {/* Textinput */}
        <TextInput 
        onChangeText={(newValue) => setCaption(newValue)}
        value={caption} 
        placeholder=" What's on your mind ?"
        className='w-full p-3 '/>

        {/* button */}

        <View className='mt-auto w-full'>
          <Button title='Share' onPress={()=>{}}/>
        </View>
    </View>
  )
}
