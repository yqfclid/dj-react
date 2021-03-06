import React from 'react';
// import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Tuna from 'tunajs';

// import { startStopSong } from '../actions/index.action';
// import { handlePlaybackSpeed } from '../actions/index.action';
import * as actions from '../actions/index.action'

// import Playlist from './playlist.container';

// import Turntable from './turntable.component';
// import Mixer from './mixer.component';


import Fader from './fader.component';

import Pot from './knob.component';


import Visualizer from './visualizer.component';





const styles = {
    root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    height: 105,
    paddingBottom: 15,
    marginTop: 0,
    marginLeft: -10,
        // marginLeft: '0%',
    width: 55,
    // width: '100%',
  },
    fxsection: {
        display: 'flex',
    backgroundColor: "black",
    backgroundImage: 'linear-gradient(bottom, rgb(82,79,82) 0%, rgb(134,134,134) 57%)',
    backgroundImage:' -o-linear-gradient(bottom, rgb(82,79,82) 0%, rgb(134,134,134) 57%)',
    backgroundImage: '-moz-linear-gradient(bottom, rgb(82,79,82) 0%, rgb(134,134,134) 57%)',
    backgroundImage: '-webkit-linear-gradient(bottom, rgb(82,79,82) 0%, rgb(134,134,134) 57%)',
    backgroundImage: '-ms-linear-gradient(bottom, rgb(82,79,82) 0%, rgb(134,134,134) 57%)',
    webKitBorderRadius: 10,
    MozBorderRadius: 10,
    borderRadius: 10,
    webKitBoxShadow: 'inset 0px 2px 0px #a8a8a8, 0px 2px 0px #2a2a2a, 0px 3px 0px #2a2a2a, 0px 4px 0px #2a2a2a, 0px 5px 0px #2a2a2a, 0px 6px 0px #2a2a2a, 0px 7px 0px #2a2a2a, 0px 8px 0px #2a2a2a, 0px 9px 0px #2a2a2a, 0px 10px 0px #2a2a2a, 10px 20px 10px #000',
    MozBoxShadow: 'inset 0px 2px 0px #a8a8a8, 0px 2px 0px #2a2a2a, 0px 3px 0px #2a2a2a, 0px 4px 0px #2a2a2a, 0px 5px 0px #2a2a2a, 0px 6px 0px #2a2a2a, 0px 7px 0px #2a2a2a, 0px 8px 0px #2a2a2a, 0px 9px 0px #2a2a2a, 0px 10px 0px #2a2a2a, 10px 20px 10px #000',
    boxShadow: 'inset 0px 2px 0px #a8a8a8, 0px 2px 0px #2a2a2a, 0px 3px 0px #2a2a2a, 0px 4px 0px #2a2a2a, 0px 5px 0px #2a2a2a, 0px 6px 0px #2a2a2a, 0px 7px 0px #2a2a2a, 0px 8px 0px #2a2a2a, 0px 9px 0px #2a2a2a, 0px 10px 0px #2a2a2a, 10px 20px 10px #000',
    },
    knob: {
        display: 'inline-block',
    },
    meter: {
      display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'space-around',
      transform: 'rotate(-90deg)',
      marginTop: 95,
      marginLeft: 10,
      height: 30,
  }
}

//const source;
//export default 
class FxSection extends React.Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     lpCutoff: this.props.lpCutoff
        // }

        //}}
    }

    componentDidMount() {
        setTimeout(() => {
        var audioContext = this.props.audioContext;

        var deck = document.querySelector(':scope .' + this.props.deckNum + ' audio');

        // var deck = document.querySelector(':scope .' + this.props.deckNum + ' video');

        this.source = audioContext.createMediaElementSource(deck);



        var tuna = new Tuna(audioContext);


        this.delay = new tuna.Delay({
            feedback: 0.5,    //0 to 1+
            delayTime: this.props.delayTime,    //1 to 10000 milliseconds
            wetLevel: this.props.delayMix,    //0 to 1+
            dryLevel: 0.5,       //0 to 1+
            cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
            bypass: this.props.delayBypass
        });

        // this.bitcrusher = new tuna.Bitcrusher({
        //     bits: this.props.bits,          //1 to 16
        //     normFreq: this.props.normFreq / 100,    //0 to 1
        //     bufferSize: this.props.bufferSize,  //256 to 16384
        //     bypass: this.props.bitCrusherBypass || true
        // });

        this.bitcrusher = new tuna.Overdrive({
            outputGain: 0,         //0 to 1+
            drive: 1,              //0 to 1
            curveAmount: this.props.bits,          //0 to 1
            algorithmIndex: 5,       //0 to 5, selects one of our drive algorithms
            bypass: this.props.bitCrusherBypass
});

        this.reverb = new tuna.Convolver({
            highCut: 22050,                         //20 to 22050
            lowCut: 50,                             //20 to 22050
            dryLevel: 1,                            //0 to 1+
            wetLevel: 0, //this.props.reverbMix,                            //0 to 1+
            level: 1,                               //0 to 1+, adjusts total output of both wet and dry
            impulse: "../dj-react/assets/impulses/LargeLongEchoHall.wav",    //the path to your impulse response
            bypass: false //this.props.reverbBypass
        });

        this.compressor = new tuna.Compressor({
            threshold: -0.3,    //-100 to 0
            makeupGain: 0,     //0 and up (in decibels)
            attack: 1,         //0 to 1000
            release: 0,        //0 to 3000
            ratio: 20,          //1 to 20
            knee: 5,           //0 to 40
            automakeup: true,  //true/false
            bypass: false
        });


        this.oscillator = audioContext.createOscillator();
        this.oscillator.type = 'square'
        this.oscillator.frequency.value = this.props.oscFreq;

        this.gainNode = audioContext.createGain()
        this.xFade = audioContext.createGain()
        this.analyser = audioContext.createAnalyser();
        this.distortion = audioContext.createWaveShaper();
        this.treble = audioContext.createBiquadFilter();
        this.mid = audioContext.createBiquadFilter();
        this.bass = audioContext.createBiquadFilter();
        this.lowPassFilter = audioContext.createBiquadFilter();
        this.highPassFilter = audioContext.createBiquadFilter();

        this.gainNode.gain.value = 1;
        this.xFade.gain.value = this.props.xFade;

        // EQ

        this.treble.type = "highshelf";
        this.treble.frequency.value = 7000;
        this.treble.gain.value = this.props.treble;
        this.treble.Q.value = 0;

        this.mid.type = "peaking";
        this.mid.frequency.value = 1000;
        this.mid.gain.value = this.props.mid;
        this.mid.Q.value = 0;

        this.bass.type = "lowshelf";
        this.bass.frequency.value = 100;
        this.bass.gain.value = this.props.bass;
        this.bass.Q.value = 0;

        // Filter
        this.lowPassFilter.type = "lowpass";
        this.lowPassFilter.frequency.value = this.props.lpCutoff;
        this.lowPassFilter.gain.value = 0;
        this.lowPassFilter.Q.value = this.props.lpRes;

        this.highPassFilter.type = "highpass";
        this.highPassFilter.frequency.value = this.props.hpCutoff;
        this.highPassFilter.gain.value = 0;
        this.highPassFilter.Q.value = 10;

        // Analyser
//const analyser = this.analyser;
   // Establish analyser variables
//    var canvas, ctx, source, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
//    canvas = document.getElementById('analyser_render');
//    ctx = canvas.getContext('2d');
   //frameLooper(audioContext, analyser);


// frameLooper animates graphics based on audio frequency
//    function frameLooper() {
//        window.webkitRequestAnimationFrame(frameLooper);
//        fbc_array = new Uint8Array(analyser.frequencyBinCount);
//        this.analyser.getByteFrequencyData(fbc_array);
//        ctx.clearRect(0, 0, canvas.width, canvas.height);
//        ctx.fillStyle = '#00CCFF';
//        bars = 100;
//        for (var i=0; i< bars; i++) {
//            bar_x = i*3;
//            bar_width = 2;
//            bar_height = -(fbc_array[i] / 2);
//            // fillRect(x, y, width, height)
//            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
//        }

//    }

         /* Create a script processor node with a `bufferSize` of 1024. */
    //this.processor = audioContext.createScriptProcessor(1024),
    /* Create an analyser node */
    //this.analyser = audioContext.createAnalyser();



/* Define a Uint8Array to receive the analysers data. */
//var data = new Uint8Array(this.analyser.frequencyBinCount);

        // Connect Nodes

        this.source.connect(this.gainNode)
        // this.oscillator.connect(this.gain)
        this.gainNode.connect(this.bass)
        this.bass.connect(this.mid)
        this.mid.connect(this.treble)
        this.treble.connect(this.bitcrusher)
        this.bitcrusher.connect(this.highPassFilter)
        this.highPassFilter.connect(this.lowPassFilter)
        this.lowPassFilter.connect(this.delay)
        // this.lowPassFilter.connect(this.phaser)
        // this.phaser.connect(this.delay)
        this.delay.connect(this.reverb)
        this.reverb.connect(this.compressor)
        // this.reverb.connect(this.tremolo)
        // this.tremolo.connect(this.analyser)
        this.compressor.connect(this.analyser)
        this.analyser.connect(this.xFade)
        this.xFade.connect(audioContext.destination)
        // this.analyser.connect(this.processor);
        // this.processor.connect(audioContext.destination)


}, 1000);
    }


    componentDidUpdate() {

        this.treble.gain.value = this.props.treble;
        this.mid.gain.value = this.props.mid;
        this.bass.gain.value = this.props.bass;
        this.lowPassFilter.frequency.value = this.props.lpCutoff;
        this.lowPassFilter.Q.value = this.props.lpRes/10;
        this.highPassFilter.frequency.value = this.props.hpCutoff;
        this.highPassFilter.Q.value = this.props.hpRes/10;
        this.bitcrusher.bypass = this.props.bitCrusherBypass;
        // this.bitcrusher.normFreq = this.props.normFreq;
        this.bitcrusher.curveAmount = this.props.bits/100;
        // this.bitcrusher.bufferSize = this.props.bufferSize;
        this.reverb.wetLevel = this.props.reverbMix/100;
        this.delay.delayTime = this.props.delayTime;
        this.delay.wetLevel = this.props.delayMix/100;

        const deckNum = this.props.deckNum;

        function crossfade(value, deckNum) {
     // equal-power crossfade
            if (deckNum === '_DECK1') {

                return Math.cos(value * 0.5*Math.PI);
            } else {
                return Math.cos((1.0-value) * 0.5*Math.PI);
             }
         }

        this.xFade.gain.value = crossfade(this.props.xFade, deckNum);

        console.log(this.props.xFade);

           function frameLooper() {
       window.requestAnimationFrame(frameLooper);
       fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
       this.analyser.getByteFrequencyData(fbc_array);
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.fillStyle = '#00CCFF';
       bars = 100;
       for (var i=0; i< bars; i++) {
           bar_x = i*3;
           bar_width = 2;
           bar_height = -(fbc_array[i] / 2);
           // fillRect(x, y, width, height)
           ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
       }

   }


        // frameLooper();
    }

    render() {

     

        let bitCrusherBtnClassNames = classnames('power-btn', {'active': !this.props.bitCrusherBypass})


        const model = {
  path: this.props.song.url,
  author: this.props.song.name,
  title: this.props.song.name,
  playing: this.props.play,
  //source: this.source
}


        return(
             <div
                name={this.props.name}
                className="fx-container container"
                //col-lg-12 col-md-12 col-sm-12 col-xs-12"
                style={styles.fxsection}>
                {/*<Visualizer model={ model } audioContext={this.audioContext} playing={this.props.play} width={300} height={300} play={this.props.play} />*/}


                {/*<div style={styles.knob}>*/}


                {/*<div className="row">*/}
                    {/*<div className="container">*/}

                        {/*<h4> Filters</h4>*/}
                        <div className="lpFilter effect" style={{"display": "inline-block"}}>
                            <h5>LP</h5>
                            <div className="effect" style={{"display": "inline-block"}}>

                        {/*<h5>LP</h5>*/}
                        <Pot
                        title="Cutoff"
                        defaultValue={this.props.lpCutoff}
                        value={this.props.lpCutoff}
                        onChange={(value) => {this.props.onLpFilterCutoffChange(value, this.props.deckNum)}}
                        min={0}
                        max={16000}
                        angleOffset={180}
                        angleArc={270}
                        />
                        {/*<p>LP</p>*/}
                        {/*<Pot
                        title="LP Res"
                        defaultValue={this.props.lpRes}
                        value={this.props.lpRes}
                        onChange={(value) => {this.props.onLpFilterResChange(value, this.props.deckNum), lpFilterResChange()}}
                        min={0}
                        max={100}
                        angleOffset={180}
                        angleArc={270}
                        />*/}
                        </div>
                        </div>
                        <div className="hpFilter effect" style={{"display": "inline-block"}}>
                            <h5>HP</h5>
                            <div className="effect" style={{"display": "inline-block"}}>
                        <Pot title="Cutoff" defaultValue={this.props.hpCutoff} value={this.props.hpCutoff}
                        onChange={(value) => {this.props.onHpFilterCutoffChange(value, this.props.deckNum)}}
                        min={20} max={7000} angleOffset={180}
                        angleArc={270}
                        />
                        {/*<p>HP</p>*/}
                        {/*<Pot
                        title="HP Res"
                        defaultValue={this.props.hpRes}
                        value={this.props.hpRes}
                        onChange={(value) => {this.props.onHpFilterResChange(value, this.props.deckNum), hpFilterResChange()}}
                        min={0}
                        max={100}
                        angleOffset={180}
                        angleArc={270}
                        />*/}
                        {/*</div>*/}
                        </div>
                        </div>
                        <div className="distortion-section effect" style={{"display": "inline-block"}}>
                        <h5>Crush</h5>
                        <div className="effect" style={{"display": "inline-block"}}>
                        
                        {/*<Pot title="CrushFreq" defaultValue={this.props.normFreq} value={this.props.normFreq}
                        onChange={(value) => {this.props.onNormFreqChange(value, this.props.deckNum), normFreqChange()}}
                        //onChange={(value) => this.lowPassFilter.frequency.value = value}
                        min={0} max={100} angleOffset={180}
                        angleArc={270}
                        />*/}


                        <Pot title="Crush" defaultValue={this.props.bits} value={this.props.bits}
                        onChange={(value) => {this.props.onBitChange(value, this.props.deckNum)}}
                        //onChange={(value) => this.lowPassFilter.frequency.value = value}
                        min={0} max={100} angleOffset={180} clockwise={true}
                        angleArc={270}
                        />


                        {/*<div>*/}
                        <button className={bitCrusherBtnClassNames} name='bitCrusherBypass' value={this.props.bitCrusherBypass} onClick={(value) => {this.props.onBitCrusherBypassChange(this.props.deckNum)}}>&#xF011;</button>
                        <span></span>
                        {/*</div>*/}
                        </div>
                        </div>

                        <div className="reverb-section effect" style={{"display": "inline-block"}}>
                        <h5>Reverb</h5>
                        <div className="effect" style={{"display": "inline-block"}}>
                        <Pot title="Mix" defaultValue={this.props.reverbMix} value={this.props.reverbMix}
                        onChange={(value) => {this.props.onReverbMixChange(value, this.props.deckNum)}}
                        //onChange={(value) => this.lowPassFilter.frequency.value = value}
                        min={0} max={100} angleOffset={180}
                        angleArc={270}
                        />
                        </div>
                        </div>
                        <div className="delay-section effect" style={{"display": "inline-block"}}>
                            <h5>Delay</h5>
                            <div className="effect" style={{"display": "inline-block"}}>
                        {/*<h5>Delay</h5>*/}
                        <Pot title="Time" defaultValue={this.props.delayTime} value={this.props.delayTime}
                        onChange={(value) => {this.props.onDelayTimeChange(value, this.props.deckNum)}}
                        //onChange={(value) => this.lowPassFilter.frequency.value = value}
                        className="effect"
                        min={0} max={1000} angleOffset={180}
                        angleArc={270}
                        />
                        </div>
                        <div className="effect" style={{"display": "inline-block"}}>
                        <Pot title="Mix"
                        className="effect" defaultValue={this.props.delayMix} value={this.props.delayMix}
                        onChange={(value) => {this.props.onDelayMixChange(value, this.props.deckNum)}}
                        //onChange={(value) => this.lowPassFilter.frequency.value = value}
                        min={0} max={100} angleOffset={180}
                        angleArc={270}
                        />
                        </div>
                        </div>
                    </div>
                // </div>
            // </div>
        // </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         treble: state.decksReducer.deck1.treble,
//         mid: state.decksReducer.deck1.mid,
//         bass: state.decksReducer.deck1.bass,
//     };
// }


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({handleTrebleControl: actions.handleTrebleControl, handleMidControl: actions.handleMidControl, handleBassControl: actions.handleBassControl}, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(FxSection);

export default FxSection;

