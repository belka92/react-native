import { StyleProp, TextStyle } from "react-native";
import { Pressable, Text, PressableProps, StyleSheet } from "react-native";

export type PressableTextProps = PressableProps & {
  text: string;
  style?: StyleProp<TextStyle>;
};

export const PressableText = (props: PressableTextProps) => {
  return (
    <Pressable {...props}>
      <Text style={[props.style, styles.text]}>{props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderColor: "rgba(0,0,0, 0.1)",
  },
});
