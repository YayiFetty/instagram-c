// FeedScreen.js
import { View, FlatList, Text } from "react-native";
import React from "react";
import PostListsItem from "@/src/components/PostListsItem";
import posts from "assets/data/posts.json";

export default function FeedScreen() {
  const renderItem = ({ item }) => {
    return <PostListsItem post={item} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ padding: 20, textAlign: "center" }}>
            No posts available
          </Text>
        }
      />
    </View>
  );
}
