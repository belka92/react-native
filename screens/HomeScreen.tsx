import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { ThemeText } from "../components/styled/ThemeText";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkouts } from "../hooks/useWorkouts";

const HomeScreen = ({ navigation }: any) => {
  const workouts = useWorkouts();

  return (
    <View style={styles.container}>
      <ThemeText style={styles.header}>New Workouts</ThemeText>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("WorkoutDetail", { slug: item.slug })
              }
            >
              <WorkoutItem item={item} />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    fontFamily: "montserrat-bold",
  },
});
