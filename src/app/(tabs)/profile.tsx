import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "@/src/components/Button";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  // useEffect(() => {
  //   if (!image) {
  //     pickImage();
  //   }
  // }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 p-3 ">
      {/* image picker */}
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-square self-center rounded-full shadow-md bg-slate-300"
        />
      ) : (
        <View className="w-52 aspect-square self-center rounded-full shadow-md bg-slate-300" />
      )}
       <Text onPress={pickImage} className='text-blue-500 font-semibold m-5 self-center'>
            Change
        </Text>

      {/* form */}
      <Text className="mb-2 text-gray-500 font-semibold">Username</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="border border-gray-300 p-3 rounded-md  shadow-sm "
      />
      <Text className="mb-2 text-gray-500 font-semibold">Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 p-3 rounded-md  shadow-sm "
      />

      <Text className="mb-2 text-gray-500 font-semibold">Website</Text>
      <TextInput
        placeholder="Website"
        value={website}
        onChangeText={setWebsite}
        className="border border-gray-300 p-3 rounded-md  shadow-sm "
      />

      {/* button */}
      <View className="gap-2 mt-auto">
      <Button title="Update profile" onPress={() =>{}} />
      <Button title="Sign Out" onPress={() =>{}} />
      </View>
    </View>
  );
}
