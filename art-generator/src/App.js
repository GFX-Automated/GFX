import logo from './logo.svg';
import './App.css';

import React, { Component } from "react";
// import Sketch from "react-p5";
import P5Sketch from './generator';
// import P5ShapesSketch from './generators/sphere';


export default class App extends Component {
  genOne = <P5Sketch />
  genTwo = <P5Sketch />

  constructor(props) {
    super(props);
    this.state = {
      selectedGenerator: 0,
      hasSentData: false,
      hasReceivedData: false,
      matchCompleted: false,
      generatorOne: {}, // contains generator data
      generatorTwo: {},
      matchId: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  selectGenerator(genId) {
    this.setState({
      selectedGenerator: genId
    });
  }

  handleClick() {
    if (this.state.selectedGenerator === 0) {
      // make sure generator is selected
      console.error('no generator selected')
    } else if (this.state.matchCompleted) {
      // make sure match is not already completed
      console.error('match already completed')
    } else {
      const winnerId = this.state.selectedGenerator === 1 ? this.state.generatorOne.id : this.state.generatorTwo.id
      const generatorApiUrl = '/api/generators'
      const requestOptions = {
        // specify the selected winner the winner 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: this.state.matchId,
          winnerId: winnerId
        })
      }
      // put the data to the api 
      fetch(generatorApiUrl, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              matchCompleted: result.completed,
            })
          }
        )
    }
    const sendData = sentData => sentData ? false : true;
    this.setState(prevState => ({
      hasSentData: sendData(prevState.hasSentData) || prevState.hasSentData,
    }));
  }

  componentDidMount() {
    // get server info
    const generatorApiUrl = '/api/generators'
      fetch(generatorApiUrl)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              hasReceivedData: true,
              generatorOne: result.generatorA,
              generatorTwo: result.generatorB,
              matchId: result.matchId
            })
            console.log("state:")
            console.table(this.state)
          }
        )
    console.log('component did not load');
  }

  render() {
    const { selectedGenerator, hasSentData, hasReceivedData, generatorOne, generatorTwo } = this.state;
    if (hasReceivedData) {
      // displayed generator 
      let displayedGenerator;
      if (selectedGenerator === 0) {
        displayedGenerator = "None";
      } else if (selectedGenerator === 1) {
        displayedGenerator = "1";
      } else {
        displayedGenerator = "2";
      }
      return (
        <div>
          <span onClick={() => this.selectGenerator(1)}><P5Sketch generator={generatorOne} /></span>
          <span onClick={() => this.selectGenerator(2)}><P5Sketch generator={generatorTwo} /></span>
          <span><p>Selected Generator: {displayedGenerator}</p></span>
          <button onClick={this.handleClick}>
            {hasSentData ? 'Submitted' : 'Submit'}
          </button>
        </div>
      );
    } else {
      return (<div><span><p>Waiting for data...</p></span></div>)
    }
    // } else {
    //   return this.state.selectedGenerator === 1 ? (<div><span>{this.genOne}</span></div>) : (<div><span>{this.genTwo}</span></div>); 
    // }
  }
}
