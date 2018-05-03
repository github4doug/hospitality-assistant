import React from 'react';
import logo from '../../images/logo.svg';

const Footer = () =>
 <footer>
  <div className="container">
    <div className="row">
      <div className="col">
        <p>
          Built with <a href="http://facebook.github.io/react/"><img src={logo} className="App-logo" alt="logo"/></a><a href="http://nodejs.org/">Node.js</a> and <a href="https://aws.amazon.com/">AWS</a>.
          Find project on <a href="https://github.com/github4doug/hospitality-assistant">GitHub</a>.
        </p>
        <span className="copyright">Copyright &copy; doug.kobayashi 2018</span>
      </div>
  </div>
</div>
</footer>

export default Footer;
