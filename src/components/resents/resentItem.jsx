import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Avatar from "../contacts/avatar";
import { sizes } from "../../utils/contants";
import { convertFullName } from "../../utils/function";
import * as SQLite from "expo-sqlite";

import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../theme/colors";

const db = SQLite.openDatabase("ContactsDatabase.db");
x;

const ResentItem = ({ item }) => {
  const [user, setUser] = useState({});
  const getUser = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM users WHERE  id=${item.resent_id}`,
        [],
        (sqlTxn, res) => {
          if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
              let item = res.rows.item(i);
              console.log(item.name);
              if (user) setUser(item);
            }
          }
        },
        (error) => console.log("hata", error.message)
      );
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Pressable style={styles.container}>
      <View style={styles.avatarContainer}>
        {user && (
          <Avatar
            name={user?.name}
            surname={user?.surname}
            size={sizes.SMALL}
          />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {user ? convertFullName(user?.name, user?.surname) : null}
        </Text>
        <Text style={styles.job}>{item?.date}</Text>
      </View>

      <View style={styles.callTypeContainer}>
        {item?.callType == "incoming" ? (
          <Icon name="arrow-undo-outline" size={28} color={Colors.RED} />
        ) : (
          <Icon name="arrow-redo-outline" size={28} color={Colors.GREEN} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    margin: 5,
    color: Colors.BLACK,
  },
  job: {
    fontSize: 14,
    color: Colors.GRAY,
    margin: 5,
  },
  infoContainer: {
    flex: 4,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  callTypeContainer: {
    marginHorizontal: 10,
  },
});

export default ResentItem;
