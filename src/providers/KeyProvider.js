import React, { Component, createContext } from "react";

export const KeyContext = createContext();
export const KeyConsumer = KeyContext.Consumer;
const chordModifiers = ["9", "3", "13", "5", "6", "7"];
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
  ["Major", ""],
  ["Minor", ""],
  ["Minor", ""],
  ["Major", ""],
  ["Dominant", ""],
  ["Minor", ""],
  ["Half-Diminished", ""]
];
class KeyProvider extends Component {
  state = { overlap: [] };
  findCommonNotes(chordOne, chordOneType, chordTwo, chordTwoType) {
    if (chordOne != "null" && chordTwo != "null") {
      var cOne = this.makeScale(chordOne, chordOneType);
      var cTwo = this.makeScale(chordTwo, chordTwoType);
      l1 = [];
      l2 = [];
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
          if (cOne[i] === cTwo[j]) {
            l1.push([cOne[i], i + 1]);
            l2.push([cTwo[j], j + 1]);
          }
        }
      }
      l3 = [];
      l3.push(l1);
      l3.push(l2);
      return l3;
    }
  }
  makeTwoFiveOne(chord, chordType) {
    if (chord !== "null") {
      //251 structure: rootnote, Minor/Major/Dominant, added notes (b9 etc)
      var twoFiveOne = [];
      if (chordType === "Major") {
        const newChord = this.makeScale(chord, "Major");
        twoFiveOne.push([newChord[1], "Minor", ""]);
        twoFiveOne.push([newChord[4], "Dominant", ""]);
        twoFiveOne.push([newChord[0], "Major", ""]);
      } else {
        newChord = this.makeScale(chord, "Minor");
        twoFiveOne.push([newChord[1], "Half-Diminished", ""]);
        twoFiveOne.push([newChord[4], "Dominant", ""]);
        twoFiveOne.push([newChord[0], "Minor", ""]);
      }
      return twoFiveOne;
    }
  }
  findChordSubs(rootChord, chordType) {
    chordSubs = [];
    var scale = this.makeScale(chord, chordType);
    if (chordType === "Major") {
      for (var i = 0; i < 7; i++) {
        chordSubs.push(scale[i] + majorSubs[i][0] + majorSubs[i][1]);
      }
    }
  }
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
      newScale[ls[i] - 1] = allNotes[(j + mod) % 12];
    }
    return newScale;
  }
  makeScale(chord, chordType) {
    if (chordType === "Dominant") {
      var chordOne = this.convertScale("b", [7], majorScale[chord]);
    } else if (chordType === "Minor") {
      var chordOne = this.convertScale("b", [3, 5, 7], majorScale[chord]);
    } else if (chordType === "Diminished") {
      var chordOne = this.convertScale("b", [3, 5, 6], majorScale[chord]);
    } else if (chordType === "Half-Diminished") {
      var chordOne = this.convertScale("b", [3, 5, 6, 7], majorScale[chord]);
    } else {
      var chordOne = majorScale[chord].slice(0);
    }
    return chordOne;
  }
  render() {
    return (
      <KeyContext.Provider
        value={{
          state: this.state,
          makeScale: (chord, chordType) => this.makeScale(chord, chordType),
          makeTwoFiveOne: (chord, chordType) =>
            this.makeTwoFiveOne(chord, chordType),
          setOverlap: list => this.setState({ overlap: list }),
          findCommonNotes: (chordOne, chordOneType, chordTwo, chordTwoType) =>
            this.findCommonNotes(chordOne, chordOneType, chordTwo, chordTwoType)
        }}
      >
        {this.props.children}
      </KeyContext.Provider>
    );
  }
}

export default KeyProvider;
