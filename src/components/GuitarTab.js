import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  Slider
} from "react-native";
import { KeyConsumer } from "../providers/KeyProvider";
import Icon from "react-native-vector-icons/FontAwesome";

const keys = [
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
//inherits context as a prop!!!
//generates 24 tabs, 12 first, then 12 more on paginated scrollview
export default class GuitarTab extends Component {
  generateString(rootNote) {
    var stringNotes = [];
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === rootNote) {
        break;
      }
    }
    for (var j = 0; j < 25; j++) {
      stringNotes.push(keys[(i + j) % 12]);
    }
    return stringNotes;
  }
  /*
props:
highlightList = list of notes to highlight
*/
  checkHighlight(item) {
    //TODO find appropriate color scheme
    const colorList = [
      "#ff0000",
      "#0CFDA7",
      "#ff00fa",
      "#ffb600",
      "#ffee00",
      "#00B8FF",
      "#00ffd0"
    ];
    highlightFound = false;
    if (this.props.highlightList.length > 0) {
      for (var i = 0; i < this.props.highlightList.length; i++) {
        if (item === this.props.highlightList[i]) {
          return colorList[i];
          highlightFound = true;
          break;
        }
      }
    } else {
      return "white";
    }
    if (!highlightFound) {
      return "white";
    }
  }
  render() {
    var E = this.generateString("E");
    var A = this.generateString("A");
    var D = this.generateString("D");
    var G = this.generateString("G");
    var B = this.generateString("B");
    var count = [
      "",
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24
    ];
    return (
      <ScrollView style={{ height: 400, alignSelf: "stretch" }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View>
            <FlatList
              data={count}
              renderItem={item => {
                return (
                  <View
                    style={{
                      width: 40,
                      height: 60,
                      backgroundColor: "#262A2C",
                      borderRightWidth: 1,
                      borderColor: "#707070",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ color: "white" }}>{count[item.index]}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View>
            {E.map((item, index) => {
              return (
                <View style={styles.fretboard}>
                  <Text
                    style={[
                      styles.textStyle,
                      { color: this.checkHighlight(item) }
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <View>
            {A.map((item, index) => {
              return (
                <View style={styles.fretboard}>
                  <Text
                    style={[
                      styles.textStyle,
                      { color: this.checkHighlight(item) }
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <View>
            {D.map((item, index) => {
              return (
                <View style={styles.fretboard}>
                  <Text
                    style={[
                      styles.textStyle,
                      { color: this.checkHighlight(item) }
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <View>
            {G.map((item, index) => {
              return (
                <View style={styles.fretboard}>
                  <Text
                    style={[
                      styles.textStyle,
                      { color: this.checkHighlight(item) }
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <View>
            {B.map((item, index) => {
              return (
                <View style={styles.fretboard}>
                  <Text
                    style={[
                      styles.textStyle,
                      { color: this.checkHighlight(item) }
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <View>
            {E.map((item, index) => {
              return (
                <View style={styles.fretboard}>
                  <Text
                    style={[
                      styles.textStyle,
                      { color: this.checkHighlight(item) }
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = {
  fretboard: {
    backgroundColor: "#262A2C",
    height: 60,
    width: 50,
    borderWidth: 1,
    borderColor: "#707070",
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    color: "white",
    height: 40,
    width: 40
  }
};
