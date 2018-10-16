import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  Switch,
  TouchableOpacity,
  Modal,
  FlatList
} from "react-native";
import { KeyConsumer } from "../providers/KeyProvider";
import GuitarTab from "../components/GuitarTab";
import Icon from "react-native-vector-icons/FontAwesome";
const keys = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  "C#/Db",
  "D#/Eb",
  "F#/Gb",
  "G#/Ab",
  "A#/Bb"
];
const chordTypes = [
  "Major",
  "Minor",
  "Dominant",
  "Diminished",
  "Half-Diminished"
];
const majorChord = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  D: ["D", "E", "F#/Gb", "G", "A", "B", "C#/Db"],
  E: ["E", "F#/Gb", "G#/Ab", "A", "B", "C#/Db", "D#/Eb"],
  F: ["F", "G", "A", "A#/Bb", "C", "D", "E"],
  G: ["G", "A", "B", "C", "D", "E", "F#/Gb"],
  A: ["A", "B", "C#/Db", "D", "E", "F#/Gb", "G#/Ab"],
  B: ["B", "C#/Db", "D#/Eb", "E", "F#/Gb", "G#/Ab", "A#/Bb"],
  "C#/Db": ["C#/Db", "D#/Eb", "F", "F#/Gb", "G#/Ab", "C#/Bb", "C"],
  "D#/Eb": ["F#/Eb", "F", "G", "G#/Ab", "A#/Bb", "C", "D"],
  "F#/Gb": ["F#/Eb", "G#/Ab", "A#/Bb", "B", "C#/Db", "D#/Eb", "F"],
  "G#/Ab": ["G#/Ab", "A#/Bb", "C", "C#/Db", "D#/Eb", "F", "G"],
  "A#/Bb": ["A#/Bb", "C", "D", "D#/Eb", "F", "G", "A"]
};

const soloingOptions = {
  Major: ["Major Pentatonic", "Major Scale", "Lydian", "Mixolydian"],
  Minor: ["Minor Pentatonic", "Minor Scale", "Dorian", "Phrygian"],
  Dominant: ["Mixolydian"],
  Diminished: ["Locrian"],
  "Half-Diminished": ["Locrian"]
};
export default props => (
  <KeyConsumer>
    {contextProp => (
      <SoloingSuggestionPage contextProp={contextProp} {...props} />
    )}
  </KeyConsumer>
);
class SoloingSuggestionPage extends Component {
  state = {
    chordOne: "",
    chordTwoType: "",
    chordTwo: "",
    chordTwoType: "",
    chordThree: "",
    chordThreeType: ""
  };
  displayChordSelector(c, cType) {
    return (
      <View>
        <Picker
          style={{ height: 100, width: 140 }}
          selectedValue={this.state.c}
          onValueChange={value => this.setState({ c: value })}
        >
          {keys.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
        <Picker
          style={{ height: 100, width: 140 }}
          selectedValue={this.state.cType}
          prompt={"select"}
          onValueChange={value => this.setState({ cType: value })}
        >
          {chordTypes.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </View>
    );
  }
  generateSoloingScales() {
    //TODO chordModifiers
    ls = [];
  }
  render() {
    return (
      <View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#262A2C",
            height: 100,
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.openDrawer()}
            style={{ marginLeft: 10 }}
          >
            <Icon name={"align-justify"} size={40} color={"white"} />
          </TouchableOpacity>
          <Text style={{ fontSize: 38, color: "white", paddingLeft: 22 }}>
            {" "}
            Soloing
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          {this.displayChordSelector("chordOne", "chordOneType")}
        </View>
      </View>
    );
  }
}
