// PostListsItem.js
import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen"


// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";


 // Create and configure your Cloudinary instance.
 const cld = new Cloudinary({
  cloud: {
      cloudName: 'demo'
  }
});

export default function PostListsItem({ post }) {
  // Defensive check
  if (!post?.user?.image_url) {
    console.log('Missing post data:', post);
    return null;
  }

  const myImage = cld.image('sample');

  // Apply transformations

    myImage
        .resize(thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face())))  // Crop the image, focusing on the face.
        .roundCorners(byRadius(20));    // Round the corners.


  return (
    <View className="bg-white">
      {/* User Header */}
      <View className="p-3 flex-row items-center gap-2">
        
        <Image
          source={{ uri: post.user.image_url }}
          className="w-12 h-12 rounded-full"
        />
        <Text className="font-semibold">{post.user.username}</Text>
      </View>

      {/* Post Image */}
      {/* <Image
        source={{ uri: post.image_url }}
        className="w-full aspect-[4/3]"
      /> */}

      <AdvancedImage cldImg={myImage} className="w-full aspect-[4/3]"/>

      {/* Actions */}
      <View className="flex-row items-center p-3">
        <View className="flex-row gap-4">
          <AntDesign name="hearto" size={24} color="#000" />
          <Ionicons name="chatbubble-outline" size={24} color="#000" />
          <Feather name="send" size={24} color="#000" />
        </View>
        <View className="flex-1" />
        <Feather name="bookmark" size={24} color="#000"/>
      </View>
    </View>
  );
}