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

export default props => (
  <KeyConsumer>
    {contextProp => (
      <SoloingSuggestionPage contextProp={contextProp} {...props} />
    )}
  </KeyConsumer>
);
class SoloingSuggestionPage extends Component {
  state = { chord: "", chordType: "" };
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
            Soloing Suggestions
          </Text>
        </View>
        <Picker
          style={{ height: 100, width: 140 }}
          selectedValue={this.state.chordOne}
          onValueChange={value => this.setState({ chord: value })}
        >
          {keys.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
        <Picker
          style={{ height: 100, width: 140 }}
          selectedValue={this.state.chordOneType}
          prompt={"select"}
          onValueChange={value => this.setState({ chordType: value })}
        >
          {chordTypes.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </View>
    );
  }
}
