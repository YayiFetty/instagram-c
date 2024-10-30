// FeedScreen.js
import { View, FlatList, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import PostListsItem from "@/src/components/PostListsItem";
import posts from "assets/data/posts.json";
import { supabase } from "@/src/lib/supabase";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
  }, []);

  // to read posts from suapabase api
  const fetchPosts = async () => {
    let { data: posts, error } = await supabase.from("posts").select("*, user:profiles(*)");
    if(error){
      Alert.alert("Something went wrong");
    }
    console.log(JSON.stringify(data, null, 2));
    setPosts(data);
    
  };
  console.log("posts from db", posts)
  const renderItem = ({ item }:{item:any}) => {
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
