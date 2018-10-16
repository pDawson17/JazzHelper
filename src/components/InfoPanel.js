import React, { Component } from "react";
import { View, Text } from "react-native";
import Panel from "react-native-panel";

export default class InfoPanel extends Component {
  render() {
    return (
      <Panel
        header={() => {
          return (
            <View style={styles.headerStyle}>
              <Text style={{ color: "white", fontSize: 20 }}>
                {this.props.header}
              </Text>
            </View>
          );
        }}
      >
        <View style={styles.contentStyle}>{this.props.children}</View>
      </Panel>
    );
  }
}

const styles = {
  headerStyle: {
    backgroundColor: "#262A2C",
    alignSelf: "stretch",
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  contentStyle: {
    backgroundColor: "white",
    alignSelf: "stretch",
    alignItems: "center"
  },
  textStyle: {
    color: "white"
  }
};
