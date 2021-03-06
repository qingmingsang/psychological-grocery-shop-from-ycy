import React from 'react';
import Video from 'react-native-video';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { scale } from 'react-native-size-matters';

import { AnimatedWawaText } from '../../components/AnimatedWawaText';

import { pageIds } from './InStoreConfig';
import Settings from './Settings';

import Instore from './InStoreMain';
import F11 from '../CatchMouse/F11';
import F12 from '../CatchMouse/F12';
import F13 from '../CatchMouse/F13';
import F14 from '../CatchMouse/F14';
import F15 from '../CatchMouse/F15';
import F16 from '../CatchMouse/F16';
import F17 from '../CatchMouse/F17';
import F18 from '../CatchMouse/F18';
import M1 from '../CatchMouse/M1';
import M2 from '../CatchMouse/M2';
import MinisMachine from '../MinisMachine/U';
import U1 from '../MinisMachine/U1';
import U2 from '../MinisMachine/U2';
import Phonograph from '../Phonograph/V';

const backgroundMusic = require('../../audio/ThinkWild.mp3');

export class InStoreView extends React.Component {

  state = {
    love: 20,
    coins: 20,
    currentPage: pageIds.storeMain,
    showSettings: false,
    settings: {
      backgroundMusic: true,
    }
  }

  componentWillMount() {
    const funcs = {
      redirectTo: this.gotoNextPage,
      getState: this.getLoveAndCoins,
      modState: this.modLoveAndCoins,
    };

    this.allPages = {
      [pageIds.storeMain]: <Instore funcs={funcs}></Instore>,
      [pageIds.F11]: <F11 funcs={funcs}></F11>,
      [pageIds.F12]: <F12 funcs={funcs}></F12>,
      [pageIds.F13]: <F13 funcs={funcs}></F13>,
      [pageIds.F14]: <F14 funcs={funcs}></F14>,
      [pageIds.F15]: <F15 funcs={funcs}></F15>,
      [pageIds.F16]: <F16 funcs={funcs}></F16>,
      [pageIds.F17]: <F17 funcs={funcs}></F17>,
      [pageIds.F18]: <F18 funcs={funcs}></F18>,
      [pageIds.M1]: <M1 funcs={funcs}></M1>,
      [pageIds.M2]: <M2 funcs={funcs}></M2>,
      [pageIds.minisMachine]: <MinisMachine funcs={funcs}></MinisMachine>,
      [pageIds.U1]: <U1 funcs={funcs}></U1>,
      [pageIds.U2]: <U2 funcs={funcs}></U2>,
      [pageIds.phonograph]: <Phonograph funcs={funcs}></Phonograph>
    };
  }

  toggleSettings = () => {
    this.setState({ showSettings: !this.state.showSettings });
  }

  updateSettings = (newSettings) => {
    this.setState({ settings: newSettings });
  }

  gotoNextPage = (pageId, useNavigation = false) => {
    if (useNavigation) {
      this.props.navigation.navigate(pageId);
    } else {
      this.setState({ currentPage: pageId });
    }
  }

  getLoveAndCoins = () => {
    return {
      love: this.state.love,
      coins: this.state.coins,
    };
  }

  modLoveAndCoins = (love, coins) => {
    const newLove = this.state.love + love;
    const newCoins = this.state.coins + coins;
    this.setState({ love: newLove, coins: newCoins });
  }

  render() {
    return (
      <View style={styles.container}>
        <Video source={backgroundMusic}
          ref={(ref) => {
            this.player = ref
          }}
          audioOnly={true}
          paused={!this.state.settings.backgroundMusic}
          rate={1}
          repeat={true} />
        {this.state.showSettings &&
          <View style={styles.settingsDialog}>
            <Settings
              settings={this.state.settings}
              updateSettings={this.updateSettings}
              toggle={this.toggleSettings}>
            </Settings>
          </View>
        }
        <View style={styles.gearButtonArea}>
          <TouchableOpacity
            activeOpacity={.7}
            onPress={this.toggleSettings}
            style={styles.button}>
            <Image
              style={styles.buttonBackgournd}
              source={require("../../img/instore/BtnSettings.png")} />
          </TouchableOpacity>
        </View>
        <AnimatedWawaText
          style={styles.heartButtonArea}
          backgroundImage={require("../../img/instore/Heart.png")}
          value={this.state.love}>
        </AnimatedWawaText>
        <AnimatedWawaText
          style={styles.coinButtonArea}
          backgroundImage={require("../../img/instore/Coin.png")}
          value={this.state.coins}>
        </AnimatedWawaText>
        {this.allPages[this.state.currentPage]}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsDialog: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  button: {
    flex: 1,
  },
  buttonBackgournd: {
    width: '100%',
    height: '100%',
  },
  numberContainer: {
    flex: 1,
    paddingStart: 45,
    paddingVertical: 15,
  },
  numberDisplay: {
    fontSize: scale(14),
    color: 'white',
  },
  gearButtonArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 71,
    height: 76,
    zIndex: 10000,
  },
  heartButtonArea: {
    position: 'absolute',
    right: 20,
    top: 2,
    width: 135,
    height: 45,
    zIndex: 10000,
  },
  coinButtonArea: {
    position: 'absolute',
    right: 20,
    top: 38,
    width: 135,
    height: 45,
    zIndex: 10000,
  },
});

export default InStoreView;