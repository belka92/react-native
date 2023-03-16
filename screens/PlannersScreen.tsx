import { useState } from "react";
import slugify from "slugify";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import ExerciseItem from "../components/ExerciseItem";
import { SequenceItem, SequenceType, Workout } from "../types/data";
import { PressableText } from "../components/styled/PressableText";
import WorkoutForm, { WorkoutFormData } from "../components/WorkoutForm";
import { ModalComponent } from "../components/styled/ModalComponent";
import { storeWorkout } from "../storage/workout";

const PlannerScreen = ({ navigation }: NativeStackHeaderProps) => {
  const [seqItems, setSeqItems] = useState<SequenceItem[]>([]);

  const handleExerciseSubmit = (form: ExerciseFormData) => {
    const sequenceItem: SequenceItem = {
      slug: slugify(form.name + " " + Date.now(), { lower: true }),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };
    if (form.reps) {
      sequenceItem.reps = Number(form.reps);
    }
    setSeqItems([...seqItems, sequenceItem]);
  };

  const computeDiff = (exercisesCount: number, workoutDuration: number) => {
    const intensity = workoutDuration / exercisesCount;
    if (intensity <= 60) {
      return "hard";
    } else if (intensity <= 100) {
      return "normal";
    } else {
      return "easy";
    }
  };

  const handleWorkoutSubmit = async (form: WorkoutFormData) => {
    if (seqItems.length > 0) {
      const duration = seqItems.reduce((acc, item) => {
        return acc + item.duration;
      }, 0);
      const workout: Workout = {
        name: form.name,
        slug: slugify(form.name + " " + Date.now(), { lower: true }),
        difficulty: computeDiff(seqItems.length, duration),
        sequence: [...seqItems],
        duration,
      };
      await storeWorkout(workout);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={seqItems}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item}>
            <PressableText
              text="Remove"
              onPressIn={() => {
                const items = [...seqItems];
                items.splice(index, 1);
                setSeqItems(items);
              }}
            />
          </ExerciseItem>
        )}
        keyExtractor={(item) => item.slug}
      />
      <ExerciseForm onSubmit={handleExerciseSubmit} />
      <View>
        <ModalComponent
          activator={({ handleOpen }) => (
            <PressableText
              style={{
                marginTop: 15,
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 10,
              }}
              text="Create Workout"
              onPress={handleOpen}
            />
          )}
        >
          {({ handleClose }) => (
            <View>
              <WorkoutForm
                onSubmit={async (data) => {
                  await handleWorkoutSubmit(data);
                  handleClose();
                  navigation.navigate("Home");
                }}
              />
            </View>
          )}
        </ModalComponent>
      </View>
    </View>
  );
};

export default PlannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
