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

const db = SQLite.openDatabase({
  name: "ContactsDatabase",
});
// create a component
const AddContact = () => {
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
  const addNewContact = (values) => {
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO users (name, surname, phone, email, adress, job) VALUES (?,?,?,?,?,?)",
        [
          values.name,
          values.surname,
          values.phone,
          values.email,
          values.adress,
          values.job,
        ],
        (sqlTxn, res) => console.log("New contact inserted"),

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
            name: "",
            surname: "",
            email: "",
            phone: "",
            adress: " ",
            job: "",
          }}
          validationSchema={newContactSchema}
          onSubmit={(values) => addNewContact(values)}
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
                Save
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

export default AddContact;
