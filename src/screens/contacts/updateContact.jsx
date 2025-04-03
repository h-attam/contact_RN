//import liraries
import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { defaultScreenStyle } from "../../styles/defaultScreenStyle";
import { Formik } from "formik";
import { newContactSchema } from "../../utils/schema";
import SQLite from "react-native-sqlite-storage";
import { setContacts, setPending } from "../../store/slice/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { TABBAVIGATOR } from "../../utils/routes";

const db = SQLite.openDatabase({
  name: "ContactsDatabase",
});

const UpdateContact = ({ route, navigation }) => {
  const { contact } = route.params;
  const dispatch = useDispatch();
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

        (error) => {
          console.log("hata", error.message);
          dispatch(setPending(false));
        };
      });
    });
  };
  const updateContact = (values) => {
    db.transaction((txn) => {
      txn.executeSql(
        `UPDATE users SET name=?, surname=?, phone=?, email=?, adress=?, job=?WHERE id=${contact.id}`,
        [
          values.name,
          values.surname,
          values.phone,
          values.email,
          values.adress,
          values.job,
        ],
        (sqlTxn, res) => console.log("Update People"),

        (error) => console.log("hata", error.message)
      );
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
        <Formik
          initialValues={{
            name: contact.name,
            surname: contact.surname,
            email: contact.email,
            phone: String(contact.phone),
            adress: contact.adress,
            job: contact.job,
          }}
          validationSchema={newContactSchema}
          onSubmit={(values) => updateContact(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <Input
                style={styles.input}
                size="medium"
                placeholder="Name"
                label="Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                caption={errors.name}
                status={errors.name ? "danger" : "basic"}
              />
              <Input
                style={styles.input}
                size="medium"
                placeholder="Surname"
                label="Surname"
                onChangeText={handleChange("surname")}
                onBlur={handleBlur("surname")}
                value={values.surname}
                caption={errors.surname}
                status={errors.surname ? "danger" : "basic"}
              />
              <Input
                style={styles.input}
                size="medium"
                placeholder="Email"
                label="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                caption={errors.email}
                status={errors.email ? "danger" : "basic"}
              />
              <Input
                style={styles.input}
                size="medium"
                placeholder="Phone"
                label="Phone"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                caption={errors.phone}
                status={errors.phone ? "danger" : "basic"}
              />
              <Input
                style={styles.input}
                size="medium"
                placeholder="Adress"
                label="Adress"
                onChangeText={handleChange("adress")}
                onBlur={handleBlur("adress")}
                value={values.adress}
                caption={errors.adress}
                status={errors.adress ? "danger" : "basic"}
              />
              <Input
                style={styles.input}
                size="medium"
                placeholder="Job"
                label="Job"
                onChangeText={handleChange("job")}
                onBlur={handleBlur("job")}
                value={values.job}
                caption={errors.job}
                status={errors.job ? "danger" : "basic"}
              />

              <Button style={styles.button} onPress={handleSubmit}>
                Update
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 30,
  },
});

export default UpdateContact;
