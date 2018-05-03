import React from 'react';

export const getFakeMembers = count => new Promise((resolves, rejects) => {
  const api = `https://api.randomuser.me/?nat=US&results=${count}`
  const request = new XMLHttpRequest()
  request.open('GET', api)
  request.onload = () => (request.status === 200) ?
  resolves(JSON.parse(request.response).results) :
  rejects(Error(request.statusText))
  request.onerror = (err) => rejects(err)
  request.send()
})

const Member = ({ storyId, email, picture, name, location }) =>
<tr>
  <td>   <div className="portfolio-item">
    <a className="portfolio-link" data-toggle="modal" href={'#portfolioModal' + storyId}>
      <div className="portfolio-hover">
        <div className="portfolio-hover-content">
          <i className="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img className="mx-auto rounded-circle" src={picture.thumbnail} alt=""/>
    </a>
  </div>
</td>
<td>{name.first} </td>
<td>{name.last}</td>
<td>{location.city}, {location.state}</td>
</tr>

const MemberList = ({members}) =>
      <div className="member-list">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>From</th>
            </tr>
          </thead>
          <tbody>
            {
            (members.length) ?
            members.map((user, i) =>
            <Member key={i} storyId={i} {...user} />
          ) :
          console.log("0 members loaded...")}
          </tbody>
        </table>
      </div>

export default MemberList;
