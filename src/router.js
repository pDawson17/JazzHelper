import React from "react";
import HomePage from "./pages/HomePage";
import ChordSubstitutionPage from "./pages/ChordSubstitutionPage";
import { createDrawerNavigator } from "react-navigation";

export const MainNavigator = createDrawerNavigator(
  {
    Home: HomePage,
    ChordSub: ChordSubstitutionPage
  },
  {
    initialRouteName: "Home"
  }
);
