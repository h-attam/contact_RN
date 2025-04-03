import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getInitials } from "../../utils/function";
import { Colors } from "../../theme/colors";
import { height, sizes, width } from "../../utils/contants";

const Avatar = ({ name, surname, size = sizes.MEDIUM }) => {
  const setSize = () => {
    switch (size) {
      case sizes.SMALL:
        return {
          width: width * 0.15,
          height: width * 0.15,
        };
      case sizes.MEDIUM:
        return {
          width: width * 0.2,
          height: width * 0.2,
        };
      case sizes.LARGE:
        return {
          width: width * 0.25,
          height: width * 0.25,
        };

      default:
        return {
          width: width * 0.2,
          height: width * 0.2,
        };
    }
  };
  return (
    <View style={[styles.container, setSize()]}>
      <Text style={styles.name}>{getInitials(name, surname)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SOFTGRAY,
    margin: 5,
    borderRadius: 100,
  },
  name: {
    color: Colors.BLACK,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Avatar;
