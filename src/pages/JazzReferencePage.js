import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  Switch,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView
} from "react-native";
import { KeyConsumer } from "../providers/KeyProvider";
import GuitarTab from "../components/GuitarTab";
import Icon from "react-native-vector-icons/FontAwesome";
import InfoPanel from "../components/InfoPanel";

export default props => (
  <KeyConsumer>
    {contextProp => <JazzReferencePage contextProp={contextProp} {...props} />}
  </KeyConsumer>
);

class JazzReferencePage extends Component {
  state = {};
  render() {
    return (
      <ScrollView>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.openDrawer()}
            style={{ marginLeft: 10 }}
          >
            <Icon name={"align-justify"} size={40} color={"white"} />
          </TouchableOpacity>
          <Text style={{ fontSize: 38, color: "white", paddingLeft: 20 }}>
            {" "}
            Reference Page
          </Text>
        </View>
        <InfoPanel header={"Major Chords"}>
          <Text style={styles.infoTextStyle}>
            Chord Construction: 1 3 5 7 {"\n"}
            Scales: {"\n"}
            Major 7: W W H W W W H {"\n"} Construction: 1 2 3 4 5 6 7
            {"\n"}
            Lydian, Major7 + 4: W W W H W W H{"\n"}
            Construction: 1 2 3 #4 5 6 7 {"\n"}
            Major Bebop: W W H W H H W H {"\n"} Construction: 1 2 3 4 5 b6 6 7
          </Text>
        </InfoPanel>
        <InfoPanel header={"Dominant Chords"}>
          <Text style={styles.infoTextStyle}>
            Chord Construction: 1 3 5 b7 {"\n"}
            Scales: {"\n"}
            Dominant 7: W W H W W H W {"\n"} Construction: 1 2 3 4 5 6 b7
            {"\n"}
            Lydian Dominant, Dom7 + 4: W W W H W H W{"\n"}
            Construction: 1 2 3 #4 5 6 b7 {"\n"}
            Dominant Bebop: W W H W W H H H {"\n"} Construction: 1 2 3 4 5 b6 6
            7
          </Text>
        </InfoPanel>
        <InfoPanel header={"Minor Chords"}>
          <Text style={styles.infoTextStyle}>
            Chord Construction: 1 b3 5 b7 {"\n"}
            Scales: {"\n"}
            Minor 7: W H W W W H W {"\n"} Construction: 1 2 b3 4 5 6 b7
            {"\n"}
            Melodic Minor, Minor Major 7: W H W W W W H{"\n"}
            Construction: 1 2 b3 4 5 6 7 {"\n"}
            Minor Bebop: W H H H W W H W {"\n"} Construction: 1 2 b3 3 4 5 6 b7
          </Text>
        </InfoPanel>
        <InfoPanel header={"Half Diminished Chords"}>
          <Text style={styles.infoTextStyle}>
            Chord Construction: 1 b3 b5 b7 {"\n"}
            Scales: {"\n"}
            Half Diminished 7: H W W H W W W{"\n"} Construction: 1 b2 b3 4 b5 b6
            b7
            {"\n"}
            Lydian, Major7 + 4: W W W H W W H{"\n"}
            Construction: 1 2 3 #4 5 6 7 {"\n"}
            Bebop: W W H W H H W H {"\n"} Construction: 1 2 3 4 5 b6 6 7
          </Text>
        </InfoPanel>
        <InfoPanel header={"Diminished Chords"} />
      </ScrollView>
    );
  }
}

const styles = {
  infoTextStyle: {
    fontSize: 20
  },
  headerStyle: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#262A2C",
    alignSelf: "stretch",
    height: 100,
    flexDirection: "row",
    marginBottom: 40
  }
};
