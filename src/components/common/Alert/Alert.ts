import { Alert } from "react-native";

const showAlert = (title = "error", message = "general error"): void => {
  Alert.alert(title, message);
};

export default showAlert;
