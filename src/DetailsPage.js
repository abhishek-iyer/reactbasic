import React, { Component } from "react";
import "./details-module.css";
class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      state: "",
      city: "",
      zipCode: "",
      address: "",
    };
    this.phoneNumberRef = React.createRef();
    this.stateRef = React.createRef();
    this.cityRef = React.createRef();
    this.zipCodeRef = React.createRef();
    this.addressRef = React.createRef();
  }

  generatePhoneNumber = () => {
    const phoneNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return phoneNumber.toString();
  };

  generateState = () => {
    const { state } = this.state;
    const states = [
      "Tamil Nadu",
      "Kerala",
      "Andhra Pradesh",
      "Karnataka",
      "Telangana",
    ];
    const remainingStates = states.filter((s) => s !== state);
    const randomIndex = Math.floor(Math.random() * remainingStates.length);
    return remainingStates[randomIndex];
  };

  generateCity = () => {
    const { city } = this.state;
    const cities = ["Chennai", "Kochi", "Hyderabad", "Bangalore", "Vijayawada"];
    const remainingCities = cities.filter((c) => c !== city);
    const randomIndex = Math.floor(Math.random() * remainingCities.length);
    return remainingCities[randomIndex];
  };

  generateZipCode = () => {
    const zipCode = Math.floor(Math.random() * 90000) + 10000;
    return zipCode.toString();
  };

  generateAddress = () => {
    const streetNames = [
      "Gandhi Road",
      "Gopalan Street",
      "Rajaji Nagar",
      "Indira Avenue",
      "Nehru Lane",
    ];
    const randomStreet =
      streetNames[Math.floor(Math.random() * streetNames.length)];
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    return `${randomNumber}, ${randomStreet}`;
  };

  componentDidMount() {
    const phoneNumber = this.generatePhoneNumber();
    const state = this.generateState();
    const city = this.generateCity();
    const zipCode = this.generateZipCode();
    const address = this.generateAddress();

    this.phoneNumberRef.current = phoneNumber;
    this.stateRef.current = state;
    this.cityRef.current = city;
    this.zipCodeRef.current = zipCode;
    this.addressRef.current = address;

    this.setState({
      phoneNumber,
      state,
      city,
      zipCode,
      address,
    });
  }

  render() {
    const { data } = this.props;
    const { phoneNumber, state, city, zipCode, address } = this.state;

    if (!data) {
      return <p>Loading...</p>;
    }

    return (
      <div className="details-container">
        <style>
          {`.main-table, .pagination, .collapsible-drop, .search-wrapper, .import-button{ display: none; }`}
        </style>
        <h2 className="details-heading">{data.name} Details Page</h2>
        <div className="details-content">
          <p className="details-info">
            <b>Name:</b> {data.name}
          </p>
          <p className="details-info">
            <b>Age:</b> {data.age}
          </p>
          <p className="details-info">
            <b>Email:</b> {data.email}
          </p>
          <p className="details-info">
            <b>Priority:</b> {data.priority}
          </p>
          <p className="details-info">
            <b>Address:</b> {address}
          </p>
          <p className="details-info">
            <b>Phone Number:</b> {phoneNumber}
          </p>
          <p className="details-info">
            <b>State:</b> {state}
          </p>
          <p className="details-info">
            <b>City:</b> {city}
          </p>
          <p className="details-info">
            <b>Zip Code:</b> {zipCode}
          </p>
        </div>
      </div>
    );
  }
}

export default DetailsPage;
