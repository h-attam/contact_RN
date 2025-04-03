import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Avatar from "../../components/contacts/avatar";
import { sizes } from "../../utils/contants";
import { convertFullName } from "../../utils/function";
import { Colors } from "../../theme/colors";
import CircleIconButton from "../../components/ui/circleIconButton";
import Icon from "react-native-vector-icons/Ionicons";

const Calling = ({ route, navigation }) => {
  const { contact } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Avatar
          name={contact.name}
          surname={contact.surname}
          size={sizes.LARGE}
        />
        <Text style={styles.fullName}>
          {convertFullName(contact?.name, contact?.surname)}
        </Text>
      </View>

      <View style={styles.buttons}>
        <CircleIconButton
          onPress={() => navigation.goBack()}
          icon={<Icon name="call" size={28} color={Colors.WHITE} />}
          color={Colors.RED}
        />
        <CircleIconButton
          onPress={() => navigation.goBack()}
          icon={<Icon name="call" size={28} color={Colors.WHITE} />}
          color={Colors.GREEN}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.BLACK,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    color: Colors.WHITE,
  },
  buttons: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Calling;
