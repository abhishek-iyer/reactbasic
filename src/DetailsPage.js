import React, { useState, useEffect, useCallback, useRef } from "react";
import "./details-module.css";

const DetailsPage = ({ data }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  const generatePhoneNumber = useCallback(() => {
    const phoneNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return phoneNumber.toString();
  }, []);

  const generateState = useCallback(() => {
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
  }, [state]);

  const generateCity = useCallback(() => {
    const cities = ["Chennai", "Kochi", "Hyderabad", "Bangalore", "Vijayawada"];
    const remainingCities = cities.filter((c) => c !== city);
    const randomIndex = Math.floor(Math.random() * remainingCities.length);
    return remainingCities[randomIndex];
  }, [city]);

  const generateZipCode = useCallback(() => {
    const zipCode = Math.floor(Math.random() * 90000) + 10000;
    return zipCode.toString();
  }, []);

  const generateAddress = useCallback(() => {
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
  }, []);

  const phoneNumberRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const zipCodeRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    phoneNumberRef.current = generatePhoneNumber();
    stateRef.current = generateState();
    cityRef.current = generateCity();
    zipCodeRef.current = generateZipCode();
    addressRef.current = generateAddress();

    setPhoneNumber(phoneNumberRef.current);
    setState(stateRef.current);
    setCity(cityRef.current);
    setZipCode(zipCodeRef.current);
    setAddress(addressRef.current);
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-container">
      <style>
        {`.main-table, .pagination, .collapsible-drop, .search-wrapper{ display: none; }`}
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
          <b>Address:</b> {addressRef.current}
        </p>
        <p className="details-info">
          <b>Phone Number:</b> {phoneNumberRef.current}
        </p>
        <p className="details-info">
          <b>State:</b> {stateRef.current}
        </p>
        <p className="details-info">
          <b>City:</b> {cityRef.current}
        </p>
        <p className="details-info">
          <b>Zip Code:</b> {zipCodeRef.current}
        </p>
      </div>
    </div>
  );
};

export default DetailsPage;
