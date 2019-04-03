import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import RNSoundLevel from 'react-native-sound-level';


export const F13 = (props) => {
  const gotoNextPage = () => {
    props.navigation.popToTop();
    props.navigation.navigate('F14');
  };

  const startMeasuring = () => {
    console.log('Start Sound!');
    RNSoundLevel.start()
    RNSoundLevel.onNewFrame = (data) => {
      // see "Returned data" section below
      if (data.rawValue !== 0) {
        Alert.alert(`Sound level: ${data.value}, raw: ${data.rawValue}`);
        stopMeasuring();
        gotoNextPage();
      }
    };
  };

  const stopMeasuring = () => {
    RNSoundLevel.stop();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        style={styles.container}
        source={require("../../img/mouse/F13.jpg")}>
        <View style={styles.container}>
          <View style={styles.topPlaceholder}></View>
          <View style={styles.buttonArea}>
            <View style={styles.buttonPadding}></View>
            <TouchableOpacity
              onPressIn={startMeasuring}
              onPressOut={stopMeasuring}
              style={[styles.button, styles.roundButton]}>
            </TouchableOpacity>
            <View style={styles.buttonPadding}></View>
          </View>
          <View style={styles.buttomPlaceHolder}></View>
          <View style={styles.skipButtonArea}>
            <TouchableOpacity
              onPress={gotoNextPage}
              style={styles.button}>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topPlaceholder: {
    flex: 147,
  },
  buttonArea: {
    flex: 390,
    flexDirection: 'row',
  },
  buttomPlaceHolder: {
    flex: 213,
  },
  buttonPadding: {
    flex: 472,
  },
  roundButton: {
    flex: 390,
    borderRadius: 3000,
  },
  button: {
    // Display as circle, touch area is still square.
    flex: 1,
    backgroundColor: 'rgba(220, 120, 120, 0.5)',
  },
  skipButtonArea: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    width: '15%',
    height: '15%',
  }
});

export default F13;