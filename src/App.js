import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import logo from './images/logo.svg';
import mFace from './images/face99.jpg';
import fFace from './images/face95.jpg';
import './App.css';
import Timeline from './components/Timeline';
import MemberList from './components/MemberList';
import timeline_data from './data/timeline_data.json';
const chatbot_steps = [
  {
    id: '1',
    message: "Hi I'm Jill your assistant. What is your name?",
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'Hi {previousValue}, nice to meet you!',
    trigger: '4',
  },
  {
    id: '4',
    message: 'Your guest MARK has tried to reach you 3 times today. It seems URGENT regarding PROPERTY ENTRY.',
    trigger: '5',
  },
  {
    id: '5',
    component: (
      <div>
        <img alt="face" src={mFace}/>
        <p>MARK is Online now</p>
        <p>Property: 123 9th #345</p>
        <p>From: Munich, Germany</p>
        <p>Speaks: german, english</p>
        Current timezone: PST
      </div>
    ),
    trigger: '6',
  },
  {
    id: '6',
    message: 'Now seems like a good time to call. Did you want to call him now?',
    trigger: '7',
  },
  {
    id: '7',
    user: true,
    trigger: '8',
  },
  {
    id: '8',
    message: 'got it. ENGLISH is not his native language and he seems ANGRY, so best to take a deep breath and speak calmly and slowly. Connecting you now...',
    end: true,
  },
];


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showing: 'Calls',
      timelines: timeline_data
    }
  }

  render() {
    const timelineSummary = "Here is a timeline of communication with a guest. The Assistant can monitor calls and texts to identify large gaps or missing replies."
    const { timelines, showing } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Hospitality Assistant</h2>
        </div>
        <div className="App-intro">
          <p>Let's get started </p>
          <p><a id="startbutton" href="#dashboard" className="button">START</a></p>
          <video id="abc" autoPlay="autoplay" loop="loop" preload="auto">
            <source type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" src="https://4be0u13v2so13g19vd43cbas-wpengine.netdna-ssl.com/wp-content/uploads/2015/12/home-2.mp4"/>
          </video>
        </div>
        <div id="dashboard">
          <h1>Hospitality Dashboard</h1>
          <p>Here is where the Assistant keeps track of your guest communication. By monitoring chat, phone, text and email the Assistant can analyze, automate and assist with communication resulting in measurable improvements in guest satisfaction.</p>
          <table>
            <thead>
              <tr>
                <th className="fluid">Your Current Guests</th>
                <th className="fixed"></th>
                <th className="fluid"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> <MemberList count={3} /></td>
                <td></td>
                <td><ChatBot headerTitle="Hospitality Assistant" botAvatar={fFace} steps={chatbot_steps} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="timeline">
          <Timeline summary={timelineSummary} data={timelines[showing]} name={showing} />
          <div>
            <button onClick={() => this.setState({showing: 'Calls' })}>Calls</button>
            <button onClick={() => this.setState({showing: 'Texting' })}>Texting</button>
          </div>
        </div>
        <div className="callanalytics">
          <h1>Call Analytics</h1>
          <p>Here is where the Assistant loads calls for review, flagged for quality or compliance issues.</p>
          <iframe title="Call Analytics" width="1000" height="600" src="./voicebase/index.html" frameBorder="0" allowFullScreen></iframe>
        </div>
        <div className="App-footer">
          <p>
            Built with <a href="http://facebook.github.io/react/">React</a>, <a href="http://nodejs.org/">Node.js</a> and <a href="http://www.postgresql.org/">Postgres SQL</a>.
            Find project on <a href="https://github.com/github4doug/hospitality-assistant">GitHub</a>.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
