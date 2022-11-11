import "../index.css";
import { useState } from "react";

const Body = () => {
  const style = {};

  return (
    <div>
      <div>
        <div className="main">
          <button>change color</button>
          <p>playing</p>
          <div className="Circle"></div>
          <p>Name of song</p>
          <p>author</p>
        </div>
      </div>
    </div>
  );
};
export default Body;
