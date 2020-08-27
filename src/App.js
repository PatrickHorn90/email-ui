import React, { useState, useEffect } from "react";
import ContactsContainer from "./Component/Container";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function fetchData() {
    const res = await fetch("https://swapi.co/api/planets/4/");
    res.json().then((results) => setContacts(results), setIsLoaded(true));
  }

  useEffect(() => {
    fetchData();
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ContactsContainer contacts={contacts} />;
  }
};
export default App;
