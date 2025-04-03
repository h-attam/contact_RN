import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { defaultScreenStyle } from "../../styles/defaultScreenStyle";
import Avatar from "../../components/contacts/avatar";
import { convertFullName } from "../../utils/function";
import { height, sizes } from "../../utils/contants";
import { Colors } from "../../theme/colors";
import CircleIconButton from "../../components/ui/circleIconButton";
import Icon from "react-native-vector-icons/Ionicons";
import { CALLING } from "../../utils/routes";
import SQLite from "react-native-sqlite-storage";
import { setContacts, setPending } from "../../store/slice/contactSlice";
import { useDispatch } from "react-redux";

const db = SQLite.openDatabase({
  name: "ContactsDatabase",
});

const ContactDetail = ({ route, navigation }) => {
  const { contact } = route.params;
  const dispatch = useDispatch();
  const addNewCall = (date, resent_id, callType) => {
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO calls (date, resent_id, callType) VALUES (?,?,?)",
        [date, resent_id, callType],
        (sqlTxn, res) => console.log("Search Added"),
        (error) => console.log("hata", error.message)
      );
    });
  };
  const handleCall = () => {
    const now = new Date();
    const date = now.toDateString();
    addNewCall(date, contact.id, "outcoming");
    navigation.navigate(CALLING, { contact: contact });
  };
  const getContacts = () => {
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
          dispatch(setContacts(false));
        };
      });
    });
  };
  useEffect(() => {
    return () => {
      getContacts();
    };
  }, []);
  return (
    <View style={defaultScreenStyle.container}>
      <ScrollView>
        <View style={styles.userContainer}>
          <Avatar
            name={contact?.name}
            surname={contact?.surname}
            size={sizes.LARGE}
          />
          <Text style={styles.fullName}>
            {convertFullName(contact?.name, contact?.surname)}
          </Text>
          <Text style={styles.job}>{contact?.job}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CircleIconButton
            icon={
              <Icon name="chatbox-ellipses" size={26} color={Colors.WHITE} />
            }
            color={Colors.GREEN}
          />
          <CircleIconButton
            icon={
              <Icon name="chatbubble-sharp" size={26} color={Colors.WHITE} />
            }
            color={Colors.PURPLE}
          />
          <CircleIconButton
            onPress={() => handleCall()}
            icon={<Icon name="call" size={26} color={Colors.WHITE} />}
            color={Colors.BLUE}
          />
        </View>

        <View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Name</Text>
            <Text style={styles.info}>{contact.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Surname</Text>
            <Text style={styles.info}>{contact.surname}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Phone</Text>
            <Text style={styles.info}>{contact.phone}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.info}>{contact.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Adress</Text>
            <Text style={styles.info}>{contact.adress}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Job</Text>
            <Text style={styles.info}>{contact.job}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    alignItems: "center",
    height: height * 0.2,
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    height: height * 0.1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  fullName: {
    fontSize: 18,
    fontWeight: "700",
  },
  job: {
    color: Colors.GRAY,
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: Colors.SOFTGRAY,
    margin: 5,
    borderRadius: 8,
    height: height * 0.08,
    justifyContent: "center",
    padding: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.GRAY,
  },
  info: {
    color: Colors.BLACK,
    fontSize: 16,
    marginTop: 5,
  },
});

export default ContactDetail;
