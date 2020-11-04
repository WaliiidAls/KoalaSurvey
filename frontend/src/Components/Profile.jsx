import React, { Component } from "react";
import axios from "axios";
import qs from "querystring";
import config from "../axios/config";
import createQRCode from "../qrcode-generator/qrcode";

class Profile extends Component {
  state = {
    data: { employees: [] },
    name: "",
    email: "",
    couter: 0,
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    console.log(this.state);
    axios
      .get(`http://localhost:3003/company/all`, config)
      .then((res) => {
        console.log(res.data);
        const newState = this.state;
        newState.data = res.data.employees
          ? res.data
          : { employees: [], ...res.data };
        this.setState(newState);
        console.log(this.state);
      })
      .catch((error) => console.log(error));
  };
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handleNewEmployee = () => {
    const { name, email } = this.state;
    axios
      .post(
        `http://localhost:3003/company/new`,
        qs.stringify({ name, email }),
        config
      )
      .then((res) => {
        console.log(res.data);
        this.fetchData();
      })
      .catch((error) => console.log(error));
  };
  printIt(qr) {
    var win = window.open();
    win.document.open();
    win.document.write(qr);
    win.document.close();
    win.print();
  }
  handleDelete = (id) => {
    axios
      .delete(`http://localhost:3003/company/delete/${id}`, config)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };
  render() {
    const { data } = this.state;
    return this.props.id ? (
      <main className="profile">
        <div className="card-main">
          {data.logo ? (
            <img src={data.logo} alt="Logo" />
          ) : (
            <input type="file" className="image custom-file-input" />
          )}
          <div>
            <h1>{data.company ? data.company.name : "LOADING"}</h1>
            <h3>Company's ID: {data.company ? data.company._id : "LOADING"}</h3>
            <p>
              Your Company has {data.employees.length} employee. You can add
              more employees down there.
            </p>
          </div>
        </div>
        {data.employees.length != 0 ? (
          <div className="spacer">
            <div className="line">
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {data.employees.map((emp, index) => (
          <>
            <div
              className={
                index + 1 == data.employees.length ? "row last" : "row"
              }
            >
              <div className="line">
                <div
                  className={
                    index + 1 == data.employees.length ? "deadline" : null
                  }
                ></div>
                <div></div>
              </div>
              <div className="card">
                {emp.image ? (
                  <img src={emp.image} alt="Logo" />
                ) : (
                  <input type="file" className="image custom-file-input" />
                )}
                <div>
                  <h1 onClick={() => this.printIt(createQRCode(emp.id))}>
                    {emp.name}
                  </h1>
                  <h3> ID: {emp._id}</h3>
                  <h3> Email: {emp.email}</h3>
                  <p>{emp.rating ? emp.rating : "rating should be here"}</p>
                </div>
                <button
                  className="delete"
                  onClick={() => this.handleDelete(emp._id)}
                >
                  DELETE
                </button>
              </div>
            </div>
            {index + 1 != data.employees.length ? (
              <div className="spacer">
                <div className="line">
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ))}
        <div className="add-form">
          <h1>ADD EMPLOYEES</h1>
          <div>
            <input
              onChange={this.handleNameChange}
              type="text"
              placeholder="Username"
            />
            <input
              onChange={this.handleEmailChange}
              type="email"
              placeholder="Email"
            />
            <button className="primary" onClick={this.handleNewEmployee}>
              ADD EMPLOYEE
            </button>
          </div>
        </div>
      </main>
    ) : (
      <main className="profile" style={{ height: "70vh" }}>
        PLEASE LOG IN FIRST
      </main>
    );
  }
}

export default Profile;
