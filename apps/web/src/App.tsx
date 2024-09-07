import "./App.css";
// import data from "./data/hotel.json";
import Body from "@components/Body";
import Header from "./components/Header";
import { Accommodation, Query, QueryResponse } from "shared-types";
import { useState } from "react";
import { SERVER_URL } from "@constants";

function App() {
  const [searchResults, setSearchResults] = useState<Accommodation[]>([]);
  const [searchInput, setSearchInput] = useState<Query>();

  const fetchSearchResults = async (searchInput: Query) => {
    if (!searchInput) return;
    const queryString = new URLSearchParams();
    queryString.append("ski_site", searchInput.ski_site.toString());
    queryString.append("from_date", searchInput.from_date);
    queryString.append("to_date", searchInput.to_date);
    queryString.append("group_size", searchInput.group_size.toString());
    const eventSourceURL = `${SERVER_URL}/s?${queryString.toString()}`;
    const eventSource = new EventSource(eventSourceURL);

    eventSource.onmessage = function (event) {
      const data: QueryResponse = JSON.parse(event.data);
      console.log("Received data:", { data });
      const accomodations = data.body.accommodations;
      setSearchResults((prevResults) => [...prevResults, ...accomodations]);
    };

    eventSource.onerror = function (err) {
      console.error("EventSource failed:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  };

  const onSubmit = (searchInput: Query) => {
    setSearchInput(searchInput);
    fetchSearchResults(searchInput);
  };

  return (
    <>
      <div className="w-screen h-screen bg-greyish">
        <Header onSubmit={onSubmit} />
        <div className="h-4" />
        <div className="container mx-auto">
          <Body searchInput={searchInput} data={searchResults} />
        </div>
      </div>
    </>
  );
}

export default App;
