import { View, Text, useWindowDimensions, Image } from "react-native";
import React from "react";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

// Import Cloudinary React Native component
import { AdvancedImage } from "cloudinary-react-native";

// Import required actions and qualifiers from Cloudinary
import {  thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import {  focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

// Import Cloudinary instance
import { cld } from "../lib/cloudinary";

export default function PostListsItem({ post }) {
  // Defensive check
  if (!post?.user?.avatar_url || !post?.image) {
    console.log("Missing post data:", post);
    return null;
  }

  const { width } = useWindowDimensions();

  // Transform the post image
  const image = cld.image(post.image);
  // Apply the necessary transformation
   image.resize(thumbnail().width(width).height(width))
  //   .roundCorners(byRadius(20));

  console.log("advanceimg", image);
  // Transform the user avatar
  const avatar = cld.image(post.user.avatar_url);
  avatar.resize(
    thumbnail().width(50).height(50).gravity(focusOn(FocusOn.face()))
  );

  return (
    <View className="bg-white">
      {/* User Header */}
      <View className="p-3 flex-row items-center gap-2">
        {/* Optionally, use the regular Image component */}

        <Image
          source={{ uri: post.user.image_url }}
          className="w-12 h-12 rounded-full"
        />

        {/* Use AdvancedImage for Cloudinary Avatar */}
        {/* <AdvancedImage cldImg={avatar} className="w-12 aspect-square rounded-full" /> */}
        <Text className="font-semibold">{post.user.username}</Text>
      </View>

      {/* Post Image */}
      <View>
        {/* Optionally, use the regular Image component */}

        {/* <Image
          source = {{ uri:post.image_url }}
          className = "w-full aspect-[4/3]"
        />  */}

        {/* Use AdvancedImage for Cloudinary Post Image */}

        <AdvancedImage cldImg={image} className="w-full aspect-[4/3]" />

      </View>

      {/* Actions */}
      <View className="flex-row items-center p-3">
        <View className="flex-row gap-4">
          <AntDesign name="hearto" size={24} color="#000" />
          <Ionicons name="chatbubble-outline" size={24} color="#000" />
          <Feather name="send" size={24} color="#000" />
        </View>
        <View className="flex-1"/>

        <Feather name="bookmark" size={24} color="#000"/>
      </View>
    </View>
  );
}
