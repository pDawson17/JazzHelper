import React, { Component, createContext } from "react";

export const KeyContext = createContext();
export const KeyConsumer = KeyContext.Consumer;

class KeyProvider extends Component {
  state = {
    majorScales: {
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
    }
  };
  render() {
    return (
      <KeyContext.Provider
        value={{
          state: this.state
        }}
      >
        {this.props.children}
      </KeyContext.Provider>
    );
  }
}

export default KeyProvider;
