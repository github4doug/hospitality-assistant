import React from 'react';
const Modal = ({storyNum, onClick}) =>
<div className="portfolio-modal modal fade" id={"portfolioModal" + storyNum} tabIndex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="close-modal" data-dismiss="modal">
        <div className="lr">
          <div className="rl"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="modal-body">
              <h2 className="text-uppercase text-center">High Alert</h2>
              <p className="item-intro text-center text-muted">User Story {storyNum + 1}</p>
              <div className="text-left">
              <img className="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt=""/>
              <p>You are driving back from Lake Tahoe from a family ski trip. Your guest has sent an urgent email to you about getting locked out of the rental. Your Assistant recognizes</p>
              <ul>
                <li>the guest email is urgent</li>
                <li>you have not replied to the guest within 15 minutes</li>
                <li>it is outside your  working hours</li>
              </ul>
              <p>Your Assistant automatically</p>
              <ul>
                <li>sends the guest a link for instructions on what to do when locked out</li>
                <li>alerts you by phone and transcribes their urgent issue</li>
                <li>prompts you to talk with the guest OR
                  send an sms to the guest to confirm everything is ok</li>
              </ul>
            </div>
              <button id={"modal" + storyNum} onClick={onClick} className="btn btn-primary" data-dismiss="modal" type="button">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
export default Modal;
