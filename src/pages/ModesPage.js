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

const modes = [
  "Ionian",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian",
  "Locrian"
];
const majorScale = {
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
const harmonicMinors = [
  "Harmonic Minor",
  "Locrian #6",
  "Ionian #5",
  "Dorian #4",
  "Phrygian Dominant",
  "Lydian #2",
  "Ultralocrian"
];
const melodicMinors = [
  "Melodic Minor",
  "Dorian b2",
  "Lydian #5",
  "Lydian Dominant",
  "Mixolydian b6",
  "Semilocrian",
  "Superlocrian"
];
const scaleTypes = ["Major Modes", "Harmonic Minor", "Melodic Minor"];
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
export default props => (
  <KeyConsumer>
    {contextProp => <ModesPage contextProp={contextProp} {...props} />}
  </KeyConsumer>
);
class ModesPage extends Component {
  state = {
    scaleType: "",
    key: "",
    showTab: false,
    selectedMode: [],
    makeMode: false
  };
  makeMode() {
    if (
      this.state.makeMode &&
      this.state.key != "" &&
      this.state.scaleType != ""
    ) {
      var blurb = "";
      const { key, scaleType } = this.state;
      newScale = [];
      if (key != "" && scaleType != "") {
        const { convertScale } = this.props.contextProp;
        if (scaleType === "Lydian") {
          var newScale = convertScale("#", [4], majorScale[key]);
          blurb =
            "Commonly used to solo over major chord progressions. Contains a #4";
        } else if (scaleType === "Ionian") {
          blurb =
            "Root scale of the modes. Often used to solo over the major chords.";
          var newScale = majorScale[key].slice(0);
        } else if (scaleType === "Mixoydian") {
          var newScale = convertScale("b", [7], majorScale[key]);
        } else if (scaleType === "Dorian") {
          var newScale = convertScale("b", [3, 7], majorScale[key]);
        } else if (scaleType === "Aeolian") {
          var newScale = convertScale("b", [3, 6, 7], majorScale[key]);
        } else if (scaleType === "Phrygian") {
          var newScale = convertScale("b", [2, 3, 6, 7], majorScale[key]);
        } else if (scaleType === "Locrian") {
          var newScale = convertScale("b", [2, 3, 5, 6, 7], majorScale[key]);
        } else if (scaleType === "Harmonic Minor") {
          var newScale = convertScale("b", [3, 6], majorScale[key]); //check
        } else if (scaleType === "Locrian #6") {
          var newScale = convertScale("b", [2, 5, 7], majorScale[key]);
        } else if (scaleType === "Ionian #5") {
          var newScale = convertScale("#", [5], majorScale[key]);
        } else if (scaleType === "Dorian #4") {
          var newScale = convertScale("b", [3, 5, 7], majorScale[key]);
        } else if (scaleType === "Mixoydian") {
          var newScale = convertScale("b", [7], majorScale[key]);
        } else if (scaleType === "Phrygian Dominant") {
          var newScale = convertScale("b", [2, 6, 7], majorScale[key]);
        } else if (scaleType === "Lydian #2") {
          var newScale = convertScale("#", [2, 4], majorScale[key]);
        } else if (scaleType === "Ultralocrian") {
          var newScale = convertScale("b", [2, 3, 4, 5, 6, 7], majorScale[key]);
        } else if (scaleType === "Melodic Minor") {
          var newScale = convertScale("b", [3], majorScale[key]);
        } else if (scaleType === "Dorian b2") {
          var newScale = convertScale("b", [2, 3, 7], majorScale[key]);
        } else if (scaleType === "Lydian #5") {
          var newScale = convertScale("#", [4, 5], majorScale[key]);
        } else if (scaleType === "Lydian Dominant") {
          var newScale = convertScale("b", [5, 7], majorScale[key]);
        } else if (scaleType === "Mixoydian b6") {
          var newScale = convertScale("b", [6, 7], majorScale[key]);
        } else if (scaleType === "Semilocrian") {
          var newScale = convertScale("b", [3, 5, 6, 7], majorScale[key]);
        } else {
          //scaletype = Superlocrian
          var newScale = convertScale("b", [2, 3, 4, 5, 6, 7], majorScale[key]);
        }
        displayScale = newScale.slice(0);
        this.setState({ selectedMode: displayScale, makeMode: false });
      }
    }
  }
  renderScale() {
    return (
      <View
        style={{
          alignSelf: "stretch"
        }}
      >
        <Text>
          {this.state.key} {this.state.scaleType}
        </Text>
        <FlatList
          renderItem={item => {
            return (
              <View
                style={{ alignItems: "center", backgroundColor: "#262A2C" }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {this.state.selectedMode[item.index]}
                </Text>
              </View>
            );
          }}
          data={this.state.selectedMode}
          extraData={this.state}
          //keyExtractor={this.state. => key}
          style={{ alignSelf: "stretch", backgroundColor: "#262A2C" }}
        />
        <TouchableOpacity
          style={{
            height: 26,
            width: 90,
            borderRadius: 60,
            borderWidth: 1,
            marginTop: 20
          }}
          onPress={() => this.setState({ showTab: true })}
        >
          <Text style={{ textAlign: "center" }}>Show Tab</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.showTab}
          onRequestClose={() => console.log("close")}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity onPress={() => this.setState({ showTab: false })}>
              <Icon name={"arrow-left"} size={40} color={"black"} />
            </TouchableOpacity>
            <GuitarTab highlightList={this.state.selectedMode} />
          </View>
        </Modal>
      </View>
    );
  }
  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#262A2C",
            alignSelf: "stretch",
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
          <Text style={{ fontSize: 38, color: "white", paddingLeft: 100 }}>
            {" "}
            Modes
          </Text>
        </View>
        <Text style={styles.pickerLabelStyle}>Key</Text>
        <Picker
          style={{ height: 100, width: 120 }}
          selectedValue={this.state.key}
          prompt={"select"}
          onValueChange={value => this.setState({ key: value, makeMode: true })}
        >
          {keys.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "space-between"
          }}
        >
          <View>
            <Text style={styles.pickerLabelStyle}>Major Modes</Text>
            <Picker
              style={{ height: 100, width: 120 }}
              selectedValue={this.state.scaleType}
              prompt={"select"}
              onValueChange={value =>
                this.setState({ scaleType: value, makeMode: true })
              }
            >
              {modes.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>
          <View>
            <Text style={styles.pickerLabelStyle}>Harmonic Minors</Text>
            <Picker
              style={{ height: 100, width: 120 }}
              selectedValue={this.state.scaleType}
              prompt={"select"}
              onValueChange={value =>
                this.setState({ scaleType: value, makeMode: true })
              }
            >
              {harmonicMinors.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>
          <View>
            <Text style={styles.pickerLabelStyle}>Melodic Minors</Text>
            <Picker
              style={{ height: 100, width: 120 }}
              selectedValue={this.state.scaleType}
              prompt={"select"}
              onValueChange={value =>
                this.setState({ scaleType: value, makeMode: true })
              }
            >
              {melodicMinors.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>
        </View>
        <View
          style={{
            alignSelf: "stretch",
            height: 300,
            justifyContent: "center"
          }}
        >
          {this.makeMode()}
          {this.renderScale()}
        </View>
      </View>
    );
  }
}
const styles = {
  pickerLabelStyle: {
    fontSize: 14,
    textAlign: "center"
  }
};
