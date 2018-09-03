import React from "react";
import HomePage from "./pages/HomePage";
import ChordSubstitutionPage from "./pages/ChordSubstitutionPage";
import ModesPage from "./pages/ModesPage";
import SoloingSuggestionPage from "./pages/SoloingSuggestionPage";
import { createDrawerNavigator } from "react-navigation";

export const MainNavigator = createDrawerNavigator(
  {
    Home: HomePage,
    ChordSub: ChordSubstitutionPage,
    Modes: ModesPage,
    SoloingSuggestion: SoloingSuggestionPage
  },
  {
    initialRouteName: "Home"
  }
);
