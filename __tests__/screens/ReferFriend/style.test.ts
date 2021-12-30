import "react-native";
import styles from "../../../app/screens/ReferFriend/styles";

test("styles", () => {
  const style = styles;

  expect(style).toMatchSnapshot();
});
