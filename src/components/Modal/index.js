import React from 'react';
const Modal = ({storyNum, storyContent, onClick}) =>
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
              <div dangerouslySetInnerHTML={{__html: storyContent}}/>            </div>
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
