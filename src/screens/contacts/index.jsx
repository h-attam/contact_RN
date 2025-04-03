import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultScreenStyle } from "../../styles/defaultScreenStyle";
import SQLite from "react-native-sqlite-storage";
import Icon from "react-native-vector-icons/Ionicons";
import ContackItem from "../../components/contacts/contactItem";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "@ui-kitten/components";
import { setContacts, setPending } from "../../store/slice/contactSlice";
import { Colors } from "../../theme/colors";

const db = SQLite.openDatabase({
  name: "ContactsDatabase",
});

const Contacts = () => {
  const { contacts, pending } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const createContactsTable = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), surname VARCHAR(500), phone INTEGER, email VARCHAR(500), adress VARCHAR(500), job VARCHAR(500))",
        [],
        (sqlTxn, res) => console.log("Table created"),
        (error) => console.log("hata", error.message)
      );
    });
  };

  const createResentsTable = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS calls (id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(100), resent_id  INTEGER , callType VARCHAR(100))",
        [],
        (sqlTxn, res) => console.log("Calls Table created"),
        (error) => console.log("hata", error.message)
      );
    });
  };

  const getContacts = () => {
    dispatch(setPending(true));
    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM users", [], (sqlTxn, res) => {
        if (res.rows.length > 0) {
          let users = [];
          for (let i = 0; i < res.rows.length; i++) {
            let item = res.rows.item(i);
            users.push(item);
          }
          dispatch(setContacts(users));
        }
        dispatch(setPending(false));

        (error) => {
          console.log("hata", error.message);
          dispatch(setPending(false));
        };
      });
    });
  };

  useEffect(() => {
    createContactsTable();
    createResentsTable();
    getContacts();
  }, []);
  return (
    <View style={defaultScreenStyle.container}>
      {pending ? (
        <ActivityIndicator color={Colors.GRAY} />
      ) : (
        <FlatList
          ListEmptyComponent={
            <Text is no record yet>
              There is no record yet
            </Text>
          }
          data={contacts}
          renderItem={({ item }) => <ContackItem item={item} />}
        />
      )}
    </View>
  );
};

export default Contacts;
