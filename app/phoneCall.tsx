import {
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";
import { Text, View } from "../components/Themed";

interface PhoneNumbers {
  _id: string;
  phone_number: string;
  __v: string;
}

const keyExtractor = (data: PhoneNumbers) => data?._id;

export default function PhoneCall() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumbers[]>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleCallPress = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert("Massage", "Enter valid phone number");
    } else {
      RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
    }
  };

  const makeCall = async (data: string) => {
    RNImmediatePhoneCall.immediatePhoneCall(data);
  };

  const renderItem = useCallback(
    ({ item }: { item: PhoneNumbers }) => {
      const onPress = () => {
        makeCall(item?.phone_number);
      };
      return (
        <View style={{}}>
          <TouchableOpacity
            onPress={onPress}
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: "https://w7.pngwing.com/pngs/954/328/png-transparent-computer-icons-user-profile-avatar-heroes-head-recruiter.png",
              }}
              style={{ height: 28, width: 28, borderRadius: 100 }}
            />
            <Text>{item?.phone_number}</Text>
            <Image
              source={{
                uri: "https://www.iconsdb.com/icons/preview/green/phone-xxl.png",
              }}
              style={{ height: 28, width: 28, borderRadius: 100 }}
            />
          </TouchableOpacity>
        </View>
      );
    },
    [phoneNumbers]
  );

  useEffect(() => {
    fetch("http://16.170.162.36:8001/new/data")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPhoneNumbers(data?.numbersData);
        } else {
          Alert.alert("Network error", "something want wrong");
        }
      });
  }, []);
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <TextInput
        keyboardType="number-pad"
        placeholder="Enter a phone number"
        maxLength={10}
        onChangeText={(e) => setPhoneNumber(e)}
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.button} onPress={handleCallPress}>
        <Text style={styles.text}> make a Call</Text>
      </TouchableOpacity>
      {phoneNumbers ? (
        <FlatList
          style={{ marginTop: 20, width: "100%" }}
          data={phoneNumbers}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        />
      ) : (
        <ActivityIndicator
          style={{ marginTop: 48 }}
          size="large"
          color="#00ff00"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderColor: "#fff",
    backgroundColor: "#fff",
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  text: {
    textAlign: "center",
    fontWeight: "700",
    marginVertical: 8,
  },
  button: {
    width: "100%",
    backgroundColor: "#228B22",
    marginTop: 12,
    borderRadius: 8,
  },
});
