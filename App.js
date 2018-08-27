import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  FlatList,
  Slider
} from "react-native";
import KeyProvider from "./src/providers/KeyProvider";

//major to minor = flat 3rd, 5th, and 7th
//major to dom = flat 7
type Props = {};
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

const chordTypes = ["Major", "Minor", "Dominant"];
const modifier = ["9", "3", "13", "5", "6", "7"];
export default class App extends Component<Props> {
  state = {
    chordOne: "null",
    chordTwo: "null",
    chordOneType: "Major",
    chordTwoType: "Major"
  };
  convertScale(interval, ls, currScale) {
    //ls is all notes to be flatted/sharped, in integers. interval is # of b
    var mod = 0;
    newScale = currScale.slice(0);
    const allNotes = [
      "A",
      "A#/Bb",
      "B",
      "C",
      "C#/Db",
      "D",
      "D#/Eb",
      "E",
      "F",
      "F#/Gb",
      "G",
      "G#/Ab"
    ];
    if (interval === "#") {
      mod = 1;
    } else {
      mod = -1;
    }
    for (var i = 0; i < ls.length; i++) {
      for (var j = 0; j < allNotes.length; j++) {
        if (currScale[ls[i] - 1] === allNotes[j]) {
          break;
        }
      }
      console.log("inside modifier");
      console.log(newScale[ls[i] - 1]);
      console.log(currScale[j + mod]);
      console.log(newScale);
      newScale[ls[i] - 1] = allNotes[(j + mod) % 12];
      console.log(newScale);
    }
    return newScale;
  }
  findCommonNotes() {
    if (this.state.chordOne != "null" && this.state.chordTwo != "null") {
      if (this.state.chordOneType === "Dominant") {
        var chordOne = this.convertScale(
          "b",
          [7],
          majorChord[this.state.chordOne]
        );
      } else if (this.state.chordOneType === "Minor") {
        console.log("if triggered");
        var chordOne = this.convertScale(
          "b",
          [3, 5, 7],
          majorChord[this.state.chordOne]
        );
      } else {
        var chordOne = majorChord[this.state.chordOne].slice(0);
      }
      if (this.state.chordTwoType === "Dominant") {
        var chordTwo = this.convertScale(
          "b",
          [7],
          majorChord[this.state.chordTwo]
        );
      } else if (this.state.chordTwoType === "Minor") {
        console.log("if triggered");
        var chordTwo = this.convertScale(
          "b",
          [3, 5, 7],
          majorChord[this.state.chordTwo]
        );
      } else {
        var chordTwo = majorChord[this.state.chordTwo].slice(0);
      }
      console.log(chordOne);
      l1 = [];
      l2 = [];
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
          if (chordOne[i] === chordTwo[j]) {
            l1.push([chordOne[i], i + 1]);
            l2.push([chordTwo[j], j + 1]);
          }
        }
      }
      return (
        <View
          style={{
            alignSelf: "stretch",
            alignItems: "center",
            borderRadius: 20
          }}
        >
          <Text>Overlapping scale tones</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>Overlapping notes</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.state.chordOne} Scale Tones</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.state.chordTwo} Scale Tones</Text>
            </View>
          </View>
          <FlatList
            renderItem={item => {
              return (
                <View
                  style={{
                    alignSelf: "stretch",
                    flex: 1,
                    backgroundColor: "#262A2C",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: "white" }}>{l1[item.index][0]}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: "white" }}>{l1[item.index][1]}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: "white" }}>{l2[item.index][1]}</Text>
                  </View>
                </View>
              );
            }}
            data={l1}
            style={{ alignSelf: "stretch", backgroundColor: "#80B2BE" }}
          />
          <Text>Chord Tones (1,3,5,7)</Text>
        </View>
      );
    } else if (chordOne != "null" || chordTwo != "null") {
      return <Text>select another chord</Text>;
    } else {
      return <Text>select two chords</Text>;
    }
  }

  render() {
    return (
      <KeyProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#80B2BE"
          }}
        >
          <Slider
            minimumuValue={0}
            maximumValue={2}
            step={1}
            style={{ width: 250, height: 60 }}
            onSlidingComplete={value =>
              this.setState({ chordOneType: chordTypes[value] })
            }
          />
          <Text>{this.state.chordOneType}</Text>
          <Slider
            minimumuValue={0}
            maximumValue={2}
            step={1}
            style={{ width: 250, height: 60 }}
            onSlidingComplete={value =>
              this.setState({ chordTwoType: chordTypes[value] })
            }
          />
          <Text>{this.state.chordTwoType}</Text>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View style={{ alignItems: "center" }}>
              <Picker
                style={{ height: 100, width: 100 }}
                selectedValue={this.state.chordOne}
                onValueChange={value => this.setState({ chordOne: value })}
              >
                {keys.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />;
                })}
              </Picker>
              <Text>
                {this.state.chordOne} {this.state.chordOneType}
              </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Picker
                style={{ height: 100, width: 100 }}
                selectedValue={this.state.chordTwo}
                prompt={"select"}
                onValueChange={value => this.setState({ chordTwo: value })}
              >
                {keys.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />;
                })}
              </Picker>
              <Text>
                {this.state.chordTwo} {this.state.chordTwoType}
              </Text>
            </View>
          </View>
          {this.findCommonNotes()}
        </View>
      </KeyProvider>
    );
  }
}
