import React, { Component } from "react";
import { View, Text, Picker, Switch, TouchableOpacity } from "react-native";
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
    chordType: false, //flase is major, true is minor
    twoFiveOne: ["", "", ""],
    set: false
  };
  displayTwoFiveOne() {
    if (this.state.set) {
      var list = this.generateTwoFiveOne();
      //common chord subs
      return (
        <View>
          <Text>
            {list[0][0]} {list[0][1]}
          </Text>
          <Text>
            {list[1][0]} {list[1][1]}
          </Text>
          <Text>
            {list[2][0]} {list[2][1]}
          </Text>
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
        <TouchableOpacity
          style={{ marginTop: 25 }}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Icon name={"align-justify"} size={40} color={"black"} />
        </TouchableOpacity>
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
        <Switch
          value={this.state.chordType}
          onValueChange={() =>
            this.setState({ chordType: !this.state.chordType })
          }
        />
        {this.displayTwoFiveOne()}
      </View>
    );
  }
}
