import { TextInput, StyleSheet, View } from "react-native";

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  style,
  required,
  ...props
}) {

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          required && !value && styles.errorInput,
          theme === 'dark' && styles.darkInput,
          style,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme === 'dark' ? "#999" : "#ccc"}
        multiline={multiline}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
  },
  darkInput: {
    backgroundColor: "#333",
    borderColor: "#555",
    color: "#fff",
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  errorInput: {
    borderColor: '#dc3545',
  },
});