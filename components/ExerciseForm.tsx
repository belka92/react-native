import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { PressableText } from "./styled/PressableText";
import { useForm, Controller } from "react-hook-form";

export type ExerciseFormData = {
  name: string;
  duration: string;
  type: string;
  reps?: string;
};

type WorkoutProps = {
  onSubmit: (form: ExerciseFormData) => void;
};
const selectionItems = ["exercise", "break", "stretch"];

const ExerciseForm = ({ onSubmit }: WorkoutProps) => {
  const { control, handleSubmit } = useForm();
  const [isSelectionOn, setIsSelectionOn] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={"rgba(0,0,0,0.1)"}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Duration"
                placeholderTextColor={"rgba(0,0,0,0.1)"}
              />
            )}
          />
        </View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            name="reps"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Repetitions"
                placeholderTextColor={"rgba(0,0,0,0.1)"}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="type"
            render={({ field: { onChange, value } }) => (
              <View style={{ flex: 1 }}>
                {isSelectionOn ? (
                  <View>
                    {selectionItems.map((item) => (
                      <PressableText
                        style={styles.selection}
                        key={item}
                        text={item}
                        onPressIn={() => {
                          onChange(item);
                          setIsSelectionOn(false);
                        }}
                      />
                    ))}
                  </View>
                ) : (
                  <TextInput
                    onPressIn={() => setIsSelectionOn(true)}
                    style={styles.input}
                    placeholder="Type"
                    value={value}
                    placeholderTextColor={"rgba(0,0,0,0.1)"}
                  />
                )}
              </View>
            )}
          />
        </View>
        <PressableText
          style={{ padding: 10 }}
          text="Add Exercise"
          onPress={handleSubmit((data) => {
            onSubmit(data as ExerciseFormData);
          })}
        />
      </View>
    </View>
  );
};
export default ExerciseForm;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0,0,0, 0.1)",
  },
  rowContainer: {
    flexDirection: "row",
  },
  selection: {
    margin: 2,
    padding: 3,
    alignSelf: "center",
  },
});
