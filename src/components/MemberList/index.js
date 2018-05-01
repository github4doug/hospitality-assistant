import React, { Component } from 'react';

const getFakeMembers = count => new Promise((resolves, rejects) => {
  const api = `https://api.randomuser.me/?nat=US&results=${count}`
  const request = new XMLHttpRequest()
  request.open('GET', api)
  request.onload = () => (request.status === 200) ?
  resolves(JSON.parse(request.response).results) :
  rejects(Error(request.statusText))
  request.onerror = (err) => rejects(err)
  request.send()
})

const Member = ({ email, picture, name, location }) =>

<tr>
  <td>   <div className="portfolio-item">
    <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
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
// <div className="col-md-4 col-sm-6 portfolio-item">
//   <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
//     <div className="portfolio-hover">
//       <div className="portfolio-hover-content">
//         <i className="fa fa-plus fa-3x"></i>
//       </div>
//     </div>
//     <img className="img-fluid" src={picture.thumbnail} alt=""/>
//   </a>
//   <div className="portfolio-caption">
//     <h4>{name.first} {name.last}</h4>
//     <p className="text-muted"><a href={"mailto:" + email}>{email}</a> {location.city}, {location.state}</p>
//   </div>
// </div>


class MemberList extends Component {

  constructor() {
    super()
    this.state = {
      members: [],
      loading: false,
      error: null
    }
  }

  componentWillMount() {
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

  componentWillUpdate() {
    console.log('updating lifecycle')
  }

  render() {
    const { members, loading, error } = this.state
    return (
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
            <Member key={i} {...user} />
          ) :
          console.log("0 members loaded...")}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MemberList;
