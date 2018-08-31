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
import GuitarTab from "../components/GuitarTab";
import Icon from "react-native-vector-icons/FontAwesome";
//1 is blue, 3 is red, 5 is green, 7 is orange
//major to minor = flat 3rd, 5th, and 7th
//major to dom = flat 7
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

const chordTypes = [
  "Major",
  "Minor",
  "Dominant",
  "Diminished",
  "Half-Diminished"
];
const chordModifiers = ["9", "3", "13", "5", "6", "7"];
export default props => (
  <KeyConsumer>
    {contextProp => <HomePage contextProp={contextProp} {...props} />}
  </KeyConsumer>
);
class HomePage extends Component {
  state = {
    chordOne: "null",
    chordTwo: "null",
    chordOneType: "Major",
    chordTwoType: "Major",
    modifierOne: "",
    modifierTwo: "",
    showModal: false,
    showTab: false,
    chordTones: [[], []],
    currScale: []
  };
  findCommonNotes() {
    if (this.state.chordOne != "null" && this.state.chordTwo != "null") {
      var chordOne = this.props.contextProp.makeScale(
        this.state.chordOne,
        this.state.chordOneType
      );
      var chordTwo = this.props.contextProp.makeScale(
        this.state.chordTwo,
        this.state.chordTwoType
      );
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
          <Text style={{ fontSize: 22 }}>Overlapping scale tones</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 16 }}>Overlapping notes</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 16 }}>
                {this.state.chordOne} Scale Tones
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 16 }}>
                {this.state.chordTwo} Scale Tones
              </Text>
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
                    <Text style={{ color: "white", fontSize: 18 }}>
                      {l1[item.index][0]}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 18 }}>
                      {l1[item.index][1]}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 18 }}>
                      {l2[item.index][1]}
                    </Text>
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
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#262A2C",
            flex: 1,
            height: 100,
            flexDirection: "row"
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Icon name={"align-justify"} size={40} color={"white"} />
          </TouchableOpacity>
          <Text style={{ fontSize: 38, color: "white", paddingLeft: 22 }}>
            {" "}
            Jazz Solo Helper
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 30
              }}
            >
              <Picker
                style={{ height: 100, width: 140 }}
                selectedValue={this.state.chordOne}
                onValueChange={value => this.setState({ chordOne: value })}
              >
                {keys.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />;
                })}
              </Picker>
              <Picker
                style={{ height: 100, width: 140 }}
                selectedValue={this.state.chordOneType}
                prompt={"select"}
                onValueChange={value => this.setState({ chordOneType: value })}
              >
                {chordTypes.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />;
                })}
              </Picker>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 90,
                  borderRadius: 60,
                  borderWidth: 1,
                  marginBottom: 20
                }}
                onPress={() =>
                  this.setState({
                    currScale: this.state.chordOne,
                    showModal: true
                  })
                }
              >
                <Text style={{ textAlign: "center" }}>Pick Modifiers</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 20 }}>
                {" "}
                {this.state.chordOne} {this.state.chordOneType}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 30
              }}
            >
              <Picker
                style={{ height: 100, width: 140 }}
                selectedValue={this.state.chordTwo}
                prompt={"select"}
                onValueChange={value => this.setState({ chordTwo: value })}
              >
                {keys.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />;
                })}
              </Picker>
              <Picker
                style={{ height: 100, width: 140 }}
                selectedValue={this.state.chordTwoType}
                prompt={"select"}
                onValueChange={value => this.setState({ chordTwoType: value })}
              >
                {chordTypes.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />;
                })}
              </Picker>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 90,
                  borderRadius: 60,
                  borderWidth: 1,
                  marginBottom: 20
                }}
                onPress={() =>
                  this.setState({
                    currScale: this.state.chordTwo,
                    showModal: true
                  })
                }
              >
                <Text style={{ textAlign: "center" }}>Pick Modifiers</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 20 }}>
                {" "}
                {this.state.chordTwo} {this.state.chordTwoType}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          {this.findCommonNotes()}
        </View>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => console.log("close")}
        >
          <View>
            <TouchableOpacity
              onPress={() => this.setState({ showModal: false })}
            >
              <Icon name={"arrow-left"} size={40} color={"black"} />
            </TouchableOpacity>
            <Text>Add</Text>
            {chordModifiers.map((item, index) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <Slider
                    maximumValue={3}
                    step={1}
                    style={{ width: 300, height: 80 }}
                    //onSlidingComplete={(value) => flatSharpOrNatural[value]}
                  />
                </View>
              );
            })}
          </View>
        </Modal>
        <TouchableOpacity onPress={() => this.setState({ showTab: true })}>
          <Text>Show Tab</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.showTab}
          onRequestClose={() => console.log("close")}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity onPress={() => this.setState({ showTab: false })}>
              <Icon name={"arrow-left"} size={40} color={"black"} />
            </TouchableOpacity>
            <GuitarTab highlightList={[]} />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
