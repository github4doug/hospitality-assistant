import React from 'react';
import myFace from '../../images/me.jpg'
const Contact = () =>
<section className="bg-light" id="contact">
<div className="container">
  <div className="row">
    <div className="col-lg-12 text-center">
      <h2 className=" text-uppercase">Thanks for the Visit</h2>
      <h3 className="section-subheading text-muted">Would love to hear from you.</h3>
    </div>
  </div>
  <div className="row">
    <div className="col-sm-12">
      <div className="team-member">
        <img className="mx-auto rounded-circle" src={myFace} alt=""/>
        <h4>Doug Kobayashi</h4>
        <a href="mailto:doug.kobayashi@gmail.com?Subject=HospitalityAssistant" target="_top">Send Mail</a>
        <p className="text-muted">doug.kobayashi@gmail.com</p>
        <ul className="list-inline social-buttons">
          <li className="list-inline-item">
            <a href="https://twitter.com/doug_kobayashi">
              <i className="fa fa-twitter"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="#page-top">
              <i className="fa fa-facebook"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.linkedin.com/in/dougkobayashi/">
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-lg-8 mx-auto text-center">
      <p className="large text-muted">It is an exciting time in tech right now with the current advances in AI and the consumer acceptance of conversational bots and ML-based applications. Let me know if you are interested in teaming up on creating engaging and smart experiences in technology.</p>
    </div>
  </div>
</div>
</section>

export default Contact;
