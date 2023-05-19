import React from "react";
import NavigationMenu from "./NavigationMenu";
import Table from "./Table";
import CustomSelect from "./CustomSelect";
import "./App.css";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const App = () => {
  const handleSelect = (option) => {
    console.log("Selected option:", option);
  };

  return (
    <div className="App">
      <NavigationMenu />
      <CustomSelect options={options} onSelect={handleSelect} />
      <Table />
    </div>
  );
};

export default App;
