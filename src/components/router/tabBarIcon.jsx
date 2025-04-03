import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CONTACTS, FAVORITES, RESENTS } from "../../utils/routes";
import Icon from "react-native-vector-icons/Ionicons";

const TabBarIcon = ({ name, focused, size, color }) => {
  switch (name) {
    case RESENTS:
      return <Icon name="time" size={size} color={color} />;
    case FAVORITES:
      return <Icon name="star" size={size} color={color} />;
    case CONTACTS:
      return <Icon name="person" size={size} color={color} />;
    default:
      return <Icon name="star" size={size} color={color} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

export default TabBarIcon;
