import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { PressableText } from "./styled/PressableText";
import { useForm, Controller } from "react-hook-form";

export type WorkoutFormData = {
  name: string;
};

type WorkoutProps = {
  onSubmit: (form: WorkoutFormData) => void;
};

const WorkoutForm = ({ onSubmit }: WorkoutProps) => {
  const { control, handleSubmit } = useForm();

  return (
    <View style={styles.container}>
      <View>
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
              placeholder="Workout name"
              placeholderTextColor={"rgba(0,0,0,0.1)"}
            />
          )}
        />

        <PressableText
          style={{ marginTop: 15, padding: 10 }}
          text="Confirm"
          onPress={handleSubmit((data) => {
            onSubmit(data as WorkoutFormData);
          })}
        />
      </View>
    </View>
  );
};
export default WorkoutForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    width: 200,
    height: 40,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0,0,0, 0.1)",
  },
});
