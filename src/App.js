import React from 'react';
// import ChatBot from 'react-simple-chatbot';
// import chatbot_steps from './data/chatbot_steps';
// import Chatbot from './components/Chatbot';
// import Timeline from './components/Timeline';
// import timelineData from './data/timeline_data.json';
import './App.css';
import './fix/chatbot.css';
import {pushChat,showResponse} from './fix/chatbot';
import chatbotFace from './images/face95.jpg';
import MemberList from './components/MemberList';
const BotGreeting = {message: "So it's demo time! Just type 'demo' below and you will get a sample of what i can do."};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    showResponse(BotGreeting);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
    // this.chatInput.focus();
  }

  handleSubmit(event) {
    pushChat();
    event.preventDefault();
  }

  render() {
    return (
      <div id="assistant" className="container">
        <h2  className="text-center">Meet Your Hospitality Assistant</h2>
        <p className="text-muted">
          <img className="mx-auto rounded-circle" style={{float: 'left'}} src={chatbotFace} alt=""/>
          Hi I'm Jill your personal hospitality assistant. I'll keep track of your guest communication by monitoring your email, messenger, voicemail and text msgs. I'll automate and assist with guest communication 24 hours a day resulting in measurable improvements in your guest satisfaction.
        </p>
        <div className="row">
          <div className="col-lg-6">
            <div id="conversation" style={{width: '400px', height: '400px', border: '1px solid #ccc', backgroundColor: '#eee', padding: '4px', overflow: 'scroll'}}></div>
            <form id="chatform" style={{marginTop: '10px'}} onSubmit={this.handleSubmit}>
              <input type="text" id="wisdom" size="80" value={this.state.value} onChange={this.handleChange} ref={(input) => { this.chatInput = input; }} placeholder="type here..."/>
            </form>
          </div>
          <div className="col">
            <h4 className="text-center"><i className="fa fa-bed">&nbsp; Current Guests</i>
          </h4>
          <MemberList count={3} />
        </div>
      </div>
      {/* <button onClick={this.handleClick}>Click Me</button> */}
    </div>
  );
}
}

export default App;
