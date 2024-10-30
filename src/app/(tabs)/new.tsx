import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "@/src/components/Button";

import { uploadImage } from "@/src/lib/cloudinary";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { router } from "expo-router";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const {session} = useAuth();
  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

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

  const createPost = async () => {
    if (!image) {
      return;
    }
    const response = await uploadImage(image);

    
    console.log("image id", response?.public_id);
    // supabase insert

    const { data, error } = await supabase
      .from("posts")
      .insert([{ caption,
         image:response?.public_id,
          user_id:session?.user.id }])
      .select();

      router.push('/(tabs)')

  };

  return (
    <View className=" p-3 items-center flex-1">
      {/* image picker */}
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-[3/4] rounded-lg shadow-md bg-slate-300"
        />
      ) : (
        <View className="w-52 aspect-[3/4] rounded-lg shadow-md bg-slate-300" />
      )}
      <Text onPress={pickImage} className="text-blue-500 font-semibold m-5">
        Change
      </Text>

      {/* Textinput */}
      <TextInput
        onChangeText={(newValue) => setCaption(newValue)}
        value={caption}
        placeholder=" What's on your mind ?"
        className="w-full p-3 "
      />

      {/* button */}

      <View className="mt-auto w-full">
        <Button title="Share" onPress={createPost} />
      </View>
    </View>
  );
}
