import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "./Themed";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";

export default function EditScreenInfo() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleCallPress = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert("Massage", "Enter valid phone number");
    } else {
      RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
    }
  };
  return (
    <View>
      <TextInput
        keyboardType="number-pad"
        maxLength={10}
        onChangeText={(e) => setPhoneNumber(e)}
        style={styles.textInput}
      />
      <Pressable style={styles.button} onPress={handleCallPress}>
        <Text style={styles.text}> make a Call</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: 320,
    borderColor: "#fff",
    backgroundColor: "#fff",
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  text: {
    color: "#fff",
    width: 320,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 6,
  },
  button: {
    width: "100%",
    backgroundColor: "#228B22",
    marginTop: 12,
    height: 30,
    borderRadius: 8,
  },
});

// eas init --id 0a02270c-7c36-4889-bba0-b7346c64ab88
