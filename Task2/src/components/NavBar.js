import React, { Component } from "react";
import "./Style.css";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { udata: [], loading: false };
    this.updateState = this.updateState.bind(this);
  }
  updateState() {
    this.setState({ loading: true });
    setTimeout(
      async function () {
        const res = await fetch("https://reqres.in/api/users?page=1");
        const jres = await res.json();
        this.setState({ udata: jres["data"], loading: false });
      }.bind(this),
      3500
    );
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <p className="n1"> Student Details </p>
          <button onClick={this.updateState}> Get Users </button>
        </div>
        <div>
          <Datas loading={this.state.loading} users={this.state.udata} />
        </div>
      </div>
    );
  }
}
export default NavBar;

const Datas = ({ loading, users }) => {
  return loading ? (
    <div align="right">
      <img
        className="loader"
        src="https://gifimage.net/wp-content/uploads/2018/04/loading-spinner-gif-4.gif"
      />
    </div>
  ) : (
    <div>
      {users.map((user) => (
        <div className="cards" key={user.id}>
          <img className="cards_avatar" src={user.avatar} />
          <div className="content">
            <h2>
              {" "}
              {user.first_name} {user.last_name}{" "}
            </h2>
            <p> {user.email} </p>
          </div>
        </div>
      ))}
    </div>
  );
};
