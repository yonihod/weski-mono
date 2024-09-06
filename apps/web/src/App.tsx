import Body from "@components/Body";
import "./App.css";
import Header from "./components/Header";
import data from "./data/hotel.json";

function App() {
  const accommodations = data.body.accommodations;
  return (
    <>
      <div className="w-screen h-screen bg-white">
        <Header />
        <Body data={accommodations} />
      </div>
    </>
  );
}

export default App;
