import React, { useState, useEffect } from "react";
import ContactsContainer from "./Component/Container";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState([]);

  async function fetchData() {
    const res = await fetch("https://swapi.co/api/planets/4/");
    res.json().then((results) => setContacts(results));
  }

  useEffect(() => {
    fetchData();
  });

  return <ContactsContainer contacts={contacts} />;
};
export default App;
