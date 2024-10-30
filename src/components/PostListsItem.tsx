import { View, Text, useWindowDimensions, Image } from "react-native";
import React from "react";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { AdvancedImage } from "cloudinary-react-native";
import { fill, thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from "../lib/cloudinary";

export default function PostListsItem({ post }) {
  // Change the defensive check to only check for image
  if (!post?.image) {
    console.log("Missing post image:", post);
    return null;
  }

  const { width } = useWindowDimensions();

  // Transform the post image
  const image = cld.image(post.image)
  .resize(fill().width(300).height(300));

  // Only create avatar transformation if avatar_url exists
  const avatar = post.user?.avatar_url 
    ? cld.image(post.user.avatar_url)
        .resize(thumbnail().width(50).height(50).gravity(focusOn(FocusOn.face())))
    : null;

  return (
    <View className="bg-white">
      {/* User Header */}
      <View className="p-3 flex-row items-center gap-2">
        {/* Default avatar when no avatar_url is present */}
        <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center">
          <Text className="text-gray-500 text-lg">
            {post.user?.username?.[0]?.toUpperCase() || '?'}
          </Text>
        </View>
        <Text className="font-semibold">
          {post.user?.username || 'Anonymous User'}
        </Text>
      </View>

      {/* Post Image */}
      <View>
        <AdvancedImage 
          cldImg={image} 
          className="w-full aspect-[4/3]"
        />
      </View>

      {/* Caption */}
      {post.caption && (
        <View className="p-3">
          <Text>
            <Text className="font-semibold">{post.user?.username || 'Anonymous'}</Text>
            {' '}{post.caption}
          </Text>
        </View>
      )}

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

      {/* Timestamp */}
      <View className="px-3 pb-3">
        <Text className="text-gray-500 text-xs">
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}