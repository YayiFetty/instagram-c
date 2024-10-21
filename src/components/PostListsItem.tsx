// PostListsItem.js
import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

export default function PostListsItem({ post }) {
  // Defensive check
  if (!post?.user?.image_url) {
    console.log('Missing post data:', post);
    return null;
  }

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
      <Image
        source={{ uri: post.image_url }}
        className="w-full aspect-[4/3]"
      />

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