// FeedScreen.js
import { View, FlatList, Text, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import PostListsItem from "@/src/components/PostListsItem";
import posts from "assets/data/posts.json";
import { supabase } from "@/src/lib/supabase";

interface User {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
  website: string | null;
}

interface Post {
  id: number;
  user_id: string;
  caption: string;
  image: string;
  created_at: string;
  user: User;
}

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      if (!refreshing) setLoading(true);
      
      const { data:posts, error } = await supabase
        .from("posts")
        .select("*, user:profiles(*)")
        .order('created_at', { ascending: false }); // Add sorting
      
      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      if (posts) {
        console.log("Fetched data:", JSON.stringify(posts, null, 2));
        setPosts(posts);
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong fetching posts");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, []);

  const renderItem = ({ item }:{item:Post}) => {
        return <PostListsItem post={item} />;
    };
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-gray-600">Loading posts...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-gray-600 text-lg text-center">
              No posts available
            </Text>
            <Text className="text-gray-500 text-sm text-center mt-2">
              Be the first to share a post!
            </Text>
          </View>
        }
        contentContainerStyle={posts.length === 0 ? { flex: 1 } : {}}
      />
    </View>
  );
}