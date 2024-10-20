import "./index.css";
import Widget from "./components/Widget";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F4ECE1] to-[#FCFBF7]">
        <Header />
        <div className="flex flex-col justify-center items-center p-4">
          <Widget />
        </div>
      </div>
    </>
  );
};

export default App;
