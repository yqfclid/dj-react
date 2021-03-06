import React from 'react';
// import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classnames from 'classnames';
import * as actions from '../actions/index.action'

import Turntable from './turntable.component';
import Mixer from './mixer.component';
import FxSection from './fx-section.component';

const styles = {
  tt_mixer: {
    height: 402,
  },
  container: {
    margin: 0,
    padding: 0
  },
}

class ChannelRight extends React.Component {

  render() {

let turntableClass = classnames("turntable-container col-lg-4 col-md-4 col-sm-4 col-xs-4", this.props.orientation)
    return (
      <div id="_DECK2" className="container-fluid col-lg-6 col-md-6 col-sm-12 col-xs-12 " name={this.props.name}>
        <div
            className="container-fluid tt-mixer-container"
            style={styles.tt_mixer}>
          <Turntable
            audioContext={this.props.audioContext}
            selectSong={this.props.selectSong}
            xFade={this.props.xFade}
            deckNum="_DECK2"
            song={this.props.song}
            play={this.props.play}
            buffering={this.props.buffering}
            speed={this.props.speed}
            volume={this.props.volume}
            handlePlaybackSpeed={this.props.handlePlaybackSpeed}
            handleXfade={this.props.handleXfade}
            startStopSong={this.props.startStopSong}
            className={turntableClass}/>
          <Mixer deckNum="_DECK2"
            className="mixer col-lg-2 col-md-2 col-sm-2 col-xs-2"
            audioContext={this.props.audioContext}
            orientation={this.props.orientation}
            volume={this.props.volume}
            treble={this.props.treble}
            mid={this.props.mid}
            bass={this.props.bass}
            handleVolumeChange={this.props.handleVolumeChange}
            handleTrebleControl={this.props.handleTrebleControl}
            handleMidControl={this.props.handleMidControl}
            handleBassControl={this.props.handleBassControl}
          />
        </div>
         <div className="container-fluid col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <FxSection
        handleXFade={this.props.handleXFade}
                xFade={this.props.xFade}
                audioContext={this.props.audioContext}
                song={this.props.song}
                deckNum="_DECK2"
                oscFreq={50}
                treble={this.props.treble}
                mid={this.props.mid}
                bass={this.props.bass}
                handleVolumeChange={this.props.handleVolumeChange}
                handleTrebleControl={this.props.handleTrebleControl}
                handleMidControl={this.props.handleMidControl}
                handleBassControl={this.props.handleBassControl}
                lpFilterBypass={this.props.lpFilterBypass}
                lpCutoff={this.props.lpFilterCutoff}
                lpRes={this.props.lpFilterRes}
                hpFilterBypass={this.props.hpFilterBypass}
                hpCutoff={this.props.hpFilterCutoff}
                hpRes={this.props.hpFilterRes}
                hpCutoff={this.props.hpFilterCutoff}
                context={this.audioContext}
                onPressNote={this.onPressNote}
                onReleaseNote={this.onReleaseNote}
                onLpFilterBypassChange={this.props.handleLpFilterBypassChange}
                onLpFilterCutoffChange={this.props.handleLpFilterCutoffChange}
                onLpFilterResChange={this.props.handleLpFilterResChange}
                onHpFilterBypassChange={this.props.handleHpFilterBypassChange}
                onHpFilterCutoffChange={this.props.handleHpFilterCutoffChange}
                onHpFilterResChange={this.props.handleHpFilterResChange}
                onBitCrusherBypassChange={this.props.handleBitCrusherBypassChange}
                onBitChange={this.props.handleBitChange}
                onNormFreqChange={this.props.handleNormFreqChange}
                onBufferSizeChange={this.props.handleBufferSizeChange}
                onReverbBypassChange={this.props.handleReverbBypassChange}
                onReverbMixChange={this.props.handleReverbMixChange}
                onDelayBypassChange={this.props.handleDelayBypassChange}
                onDelayTimeChange={this.props.handleDelayTimeChange}
                onDelayMixChange={this.props.handleDelayMixChange}
                bits={this.props.bits}
                normFreq={this.props.normFreq}
                bufferSize={this.props.bufferSize}
                bitCrusherBypass={this.props.bitCrusherBypass}
                reverbMix={this.props.reverbMix}
                delayTime={this.props.delayTime}
                delayMix={this.props.delayMix}
                delayBypass={false}
                reverb={this.props.reverb}
                reverbBypass={false}
                value={this.props.filter}
                play={this.props.play}
                />
            </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        song: state.decksReducer.deck2.activeSong,
        play: state.decksReducer.deck2.play,
        buffering: state.decksReducer.deck2.buffering,
        speed: state.decksReducer.deck2.speed,
        volume: state.decksReducer.deck2.volume,
        treble: state.decksReducer.deck2.treble,
        mid: state.decksReducer.deck2.mid,
        bass: state.decksReducer.deck2.bass,
        lpFilterCutoff: state.decksReducer.deck2.lpFilterCutoff,
        lpFilterRes: state.decksReducer.deck2.lpFilterRes,
        hpFilterCutoff: state.decksReducer.deck2.hpFilterCutoff,
        hpFilterRes: state.decksReducer.deck2.hpFilterRes,
        reverbMix: state.decksReducer.deck2.reverbMix,
        delay: state.decksReducer.deck2.delay,
        distortion: state.decksReducer.deck2.distortion,
        bitCrusherBypass: state.decksReducer.deck2.bitCrusherBypass,
        bits: state.decksReducer.deck2.bits,
        normFreq: state.decksReducer.deck2.normFreq,
        bufferSize: state.decksReducer.deck2.bufferSize,
        delayTime: state.decksReducer.deck2.delayTime,
        delayMix: state.decksReducer.deck2.delayMix,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handlePlaybackSpeed: actions.handlePlaybackSpeed,
        startStopSong: actions.startStopSong,
        selectSong: actions.selectSong,
        handleVolumeChange: actions.handleVolumeChange,
        handleTrebleControl: actions.handleTrebleControl,
        handleMidControl: actions.handleMidControl,
        handleBassControl: actions.handleBassControl,
        handleLpFilterCutoffChange: actions.handleLpFilterCutoffChange,
        handleLpFilterResChange: actions.handleLpFilterResChange,
        handleHpFilterCutoffChange: actions.handleHpFilterCutoffChange,
        handleHpFilterResChange: actions.handleHpFilterResChange,
        handleReverbMixChange: actions.handleReverbMixChange,
        handleDelayChange: actions.handleDelayChange,
        handleDistortionChange: actions.handleDistortionChange,
        handleBitCrusherBypassChange: actions.handleBitCrusherBypassChange,
        handleBitChange: actions.handleBitChange,
        handleNormFreqChange: actions.handleNormFreqChange,
        handleBufferSizeChange: actions.handleBufferSizeChange,
        handleDelayTimeChange: actions.handleDelayTimeChange,
        handleDelayMixChange: actions.handleDelayMixChange,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelRight);

