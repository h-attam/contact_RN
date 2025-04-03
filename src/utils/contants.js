import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const sizes = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

export { height, width, sizes };
