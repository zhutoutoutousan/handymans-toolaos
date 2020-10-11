import React from "react";
import { render } from "react-dom";
import { Router, Link } from '@reach/router';
import SearchParams from "./SearchParams";
import Details from "./Details";


const App = () => {
  // return React.createElement("div", { id: "something-important"}, [
  //     React.createElement("h1", {}, "Adopt Me!"),
  //     React.createElement(Pet, {
  //         name: "Luna",
  //         animal: "Dog",
  //         breed: "Havanese",
  //     }),
  //     React.createElement(Pet, {
  //         name: "Pepper",
  //         animal: "Bird",
  //         breed: "Cocktail",
  //     }),
  //     React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mixed" }),
  //     ]);
  return (
    <React.StrictMode>
    <div>

        <header>
          <Link to="/">
          Adopt Me!
          </Link>
        </header>
        {/* <h1 id="something-important"></h1> */}
      
      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>


    </div>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
