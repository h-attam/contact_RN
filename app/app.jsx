import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootNavigator from "../src/router/rootNavigator";

import { Provider } from "react-redux";
import store from "../src/store";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ContactsDatabase.db");

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
