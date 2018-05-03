import React from 'react';
import AWS from 'aws-sdk';
import './App.css';
import './fix/chatbot.css';
import chatbotFace from './images/face95.jpg';
import Contact from './components/Contact';
import MemberList,{getFakeMembers} from './components/MemberList';
import Footer from './components/Footer';
import Modal from './components/Modal';
import userStories from './data/user_stories.js';
const BotGreeting = "So it's demo time! Just type 'demo' below and you will get a sample of what i can do.";

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	// Provide your Pool Id here
	IdentityPoolId: 'us-east-1:55c45f0f-3547-4ba1-9b3c-0b2909be7924',
});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      members: [],
      conversation:[{text: BotGreeting, type:'lexResponse'}],
      currentStory: 0,
      loading: false,
      error: null,
      disabled: false,
      sessionAttributes: {}
    }
    this.userStories = userStories;
    this.lexruntime = new AWS.LexRuntime();
    this.lexUserId = 'chatbot-demo' + Date.now();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showRequest = this.showRequest.bind(this);
    this.showResponse = this.showResponse.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentWillMount(){
    this.setState({loading: true})
    getFakeMembers(this.props.count).then(
      members => {
        this.setState({members, loading: false})
      },
      error => {
        this.setState({error, loading: false})
      }
    )
  }

  componentDidMount(){
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
    const modalId = "" + event.target.id;
    // replace all leading non-digits with nothing
    var thenum = modalId.replace( /^\D+/g, '');
    //if (thenum !== this.state.currentStory){
      var sessionAttributes = this.state.sessionAttributes;
      // merge the story and user into the session
      const user = (({ name, location, nat }) => ({ name, location, nat }))(this.state.members[thenum]);
      const userInfo = {firstName: user.name.first,
        lastName: user.name.last,
        city: user.location.city,
        state: user.location.state,
        country: user.nat
      };
      Object.assign(sessionAttributes, this.userStories[thenum], userInfo);
      // console.log(sessionAttributes);
      this.setState({currentStory: thenum, sessionAttributes: sessionAttributes});
    //}
  }

  handleSubmit(event) {
    // if there is text to be sent...
    var chatText = this.state.value.trim();
    if (chatText.length > 0) {
      this.setState({disabled: true, value: "..."});
      // send it to the Lex runtime
      var params = {
        botAlias: '$LATEST',
        botName: 'HospitalityAssistant',
        inputText: chatText,
        userId: this.lexUserId,
        sessionAttributes: this.state.sessionAttributes
      };
      this.showRequest(chatText);
      this.lexruntime.postText(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
          this.showError('Error:  ' + err.message + ' (see console for details)')
        }
        if (data) {
          // capture the sessionAttributes for the next cycle
          // this.setState({sessionAttributes: data.sessionAttributes});
          // show response and/or error/dialog status
          this.showResponse(data);
        }
        // re-enable input
        this.setState({disabled: false, value: ""});
        this.chatInput.focus();
      });
    }
    event.preventDefault();
  }

  showRequest(theText) {
    var conversation = this.state.conversation.slice();
    conversation.push({text: theText, type:'userRequest'});
    this.setState({conversation: conversation});
  }

 showResponse(lexResponse) {
    console.log(lexResponse);
    var conversation = this.state.conversation.slice();
    conversation.push({text: lexResponse.message, type:'lexResponse'});
    this.setState({conversation: conversation});
    // fix
    var conversationDiv = document.getElementById('conversation');
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

   showError(theText) {
     var conversation = this.state.conversation.slice();
     conversation.push({text: theText, type:'lexError'});
     this.setState({conversation: conversation});
  }

  render() {
    return (
      <div>
        <section className="bg-light" id="portfolio">
          <div id="assistant" className="container">
            <h2  className="text-center">Meet Your Hospitality Assistant</h2>
            <p className="text-muted">
              <img className="mx-auto rounded-circle" style={{float: 'left'}} src={chatbotFace} alt=""/>
              Hi I'm Jill your personal hospitality assistant. I'll keep track of your guest communication by monitoring your email, messenger, voicemail and text msgs. I'll automate and assist with guest communication 24 hours a day resulting in measurable improvements in your guest satisfaction.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <div id="conversation" style={{width: '400px', height: '400px', border: '1px solid #ccc', backgroundColor: '#eee', padding: '4px', overflow: 'scroll'}}>
                  {this.state.conversation.map((input, i) => <p key={i} className={input.type}>{input.text}</p>)}
                </div>
                <form id="chatform" style={{marginTop: '10px'}} onSubmit={this.handleSubmit}>
                  <input disabled={this.state.disabled} type="text" id="chatInput" size="80" value={this.state.value} onChange={this.handleChange} ref={(input) => { this.chatInput = input; }} placeholder="type here..."/>
                </form>
              </div>
              <div className="col">
                <h4 className="text-center"><i className="fa fa-bed">&nbsp; Current Guests</i>
              </h4>
              <MemberList members={this.state.members} />
            </div>
          </div>
          {/* <button onClick={this.handleClick}>Click Me</button> */}
        </div>
      </section>
      <Contact/>
      <Footer/>
      <Modal storyNum={0} storyContent={this.userStories[0].content} onClick={this.handleClick.bind(this)}/>
      <Modal storyNum={1} storyContent={this.userStories[1].content} onClick={this.handleClick.bind(this)}/>
      <Modal storyNum={2} storyContent={this.userStories[2].content} onClick={this.handleClick.bind(this)}/>
    </div>
  );
}
}

export default App;
