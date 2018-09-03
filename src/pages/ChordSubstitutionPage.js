import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  Switch,
  TouchableOpacity,
  Modal
} from "react-native";
import { KeyConsumer } from "../providers/KeyProvider";
import GuitarTab from "../components/GuitarTab";
import Icon from "react-native-vector-icons/FontAwesome";
/*
COMMON CHORD SUBS:
very common (may fit under other categories):
vim for i chord
iiim for i & v chord
vii diminished for v chord
iv chord for iim chord
TRITONE SUBSTITUTIONS:
three whole tones away from Root (Dominant)
DIATONIC SUBS:
three diatonic steps away from Root (following scale order)
*/
const minorSubs = [
  ["Minor", ""],
  ["Half-Diminished", ""],
  ["Major", "#5"],
  ["Minor", ""],
  ["Dominant", ""],
  ["Major", ""],
  ["Diminished", ""]
];
const majorSubs = [
  ["Major"],
  ["Minor"],
  ["Minor"],
  ["Major"],
  ["Dominant"],
  ["Minor"],
  ["Half-Diminished"]
];
const keys = [
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
  "A",
  "A#/Bb",
  "B"
];
export default props => (
  <KeyConsumer>
    {contextProp => (
      <ChordSubstitutionPage contextProp={contextProp} {...props} />
    )}
  </KeyConsumer>
);
class ChordSubstitutionPage extends Component {
  state = {
    key: "null",
    chordType: false, //flase is minor, true is major
    twoFiveOne: ["", "", ""],
    set: false,
    chordSubs: [],
    showSubs: false,
    selectedChord: "",
    arpeggio: [],
    showTab: false
  };
  generateSubstitutions(pos, rootScale) {
    //pos is position in 2-5-1
    for (var i = 0; i < 12; i++) {
      if (rootScale[pos][0] === keys[i]) {
        break;
      }
    }
    ls = [];
    const { key, chordType } = this.state;
    if (pos === 2) {
      //MAJOR 2-5-1
      //diatonic sub
      var dia = [rootScale[(pos + 3) % 7], majorSubs[(pos + 3) % 7], ""];
      var fourChord = [rootScale[4], "Dominant"];
      ls.push(dia, fourChord);
    } else if (pos === 5) {
      //tritone sub
      var tri = [keys[(i + 4) % 12], "Dominant"];
      //diatonic sub
      var dia = [rootScale[(pos + 3) % 7], majorSubs[(pos + 3) % 7], ""];
      //iiim
      var threeminor = [rootScale[3], "Minor"];
      var sevenDim = [rootScale[7], "Diminished"];
      ls.push(tri, dia, threeminor, sevenDim);
    } else {
      //diatonic sub
      var dia = [rootScale[(pos + 3) % 7], majorSubs[(pos + 3) % 7], ""];
      //1 chord
      ls.push(dia);
    }
    this.setState({
      showSubs: true,
      chordSubs: ls,
      selectedChord: rootScale[pos - 1]
    });
  }
  displayChordSubstitutions() {
    const { showSubs, chordSubs } = this.state;
    if (showSubs) {
      return (
        <View style={{ alignSelf: "stretch", alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>
            Common Chord Substitutions for {this.state.selectedChord}
          </Text>
          {chordSubs.map((item, index) => {
            return (
              <View>
                <Text style={{ fontSize: 18, marginTop: 10 }}>
                  {chordSubs[index][0]} {chordSubs[index][1]}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    var scale = this.props.contextProp.makeScale(
                      chordSubs[index][0],
                      chordSubs[index][1]
                    );
                    var arpeggio = [];
                    arpeggio.push(scale[0], scale[2], scale[4], scale[6]);
                    this.setState({ arpeggio, showTab: true });
                  }}
                >
                  <Text>show arpeggio</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      );
    }
  }
  displayTwoFiveOne() {
    if (this.state.set) {
      var list = this.generateTwoFiveOne();
      //common chord subs
      return (
        <View style={{ flexDirection: "row", alignSelf: "stretch" }}>
          <TouchableOpacity
            style={styles.twoFiveButtonStyle}
            onPress={() => this.generateSubstitutions(2, list[3])}
          >
            <Text style={styles.buttonTextStyle}>
              {list[0][0]} {list[0][1]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.twoFiveButtonStyle}
            onPress={() => this.generateSubstitutions(5, list[3])}
          >
            <Text style={styles.buttonTextStyle}>
              {list[1][0]} {list[1][1]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.twoFiveButtonStyle}
            onPress={() => this.generateSubstitutions(1, list[3])}
          >
            <Text style={styles.buttonTextStyle}>
              {list[2][0]} {list[2][1]}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  generateTwoFiveOne() {
    const { makeTwoFiveOne } = this.props.contextProp;

    if (this.state.key !== "null") {
      if (this.state.chordType) {
        var x = makeTwoFiveOne(this.state.key, "Major");
      } else {
        var x = makeTwoFiveOne(this.state.key, "Minor");
      }
      return x;
    }
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
          <Text style={{ fontSize: 38, color: "white", paddingLeft: 60 }}>
            {" "}
            2-5-1 Chord Substitutions
          </Text>
        </View>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Picker
            style={{ height: 100, width: 100 }}
            selectedValue={this.state.key}
            prompt={"select"}
            onValueChange={value => {
              this.setState({ key: value, set: true });
            }}
          >
            {keys.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>
          <View style={{ flexDirection: "row" }}>
            <Text>Minor</Text>
            <Switch
              value={this.state.chordType}
              onValueChange={() =>
                this.setState({ chordType: !this.state.chordType })
              }
            />
            <Text>Major</Text>
          </View>
        </View>
        {this.displayTwoFiveOne()}
        {this.displayChordSubstitutions()}
        <Modal
          visible={this.state.showTab}
          onRequestClose={() => console.log("close")}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity onPress={() => this.setState({ showTab: false })}>
              <Icon name={"arrow-left"} size={40} color={"black"} />
            </TouchableOpacity>
            <GuitarTab highlightList={this.state.arpeggio} />
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = {
  twoFiveButtonStyle: {
    flex: 1,
    backgroundColor: "#262A2C",
    height: 60,
    borderColor: "#707070"
  },
  buttonTextStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  }
};
