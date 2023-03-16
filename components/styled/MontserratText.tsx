import { Text } from "react-native";

export const MontserratText = (props: Text["props"]) => {
  return (
    <Text
      children={props.children}
      style={[props.style, { fontFamily: "montserrat-regular" }]}
    />
  );
};
