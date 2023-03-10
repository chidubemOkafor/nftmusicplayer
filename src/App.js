import "./App.css";
import Music from "./components/Music.js";
import Navbar from "./components/Navbar.js";
import Body from "./components/Body.js";
import Upload from "./components/Upload.js";
// import Music from "./components/Music.js";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState({});

  return (
    <div>
      <Router>
        <Navbar accounts={accounts} setAccounts={setAccounts} />
        <Routes>
          <Route
            path="/"
            element={<Body accounts={accounts} setAccounts={setAccounts} />}
          />
          <Route
            path="/Upload"
            element={
              <Upload
                accounts={accounts}
                setAccounts={setAccounts}
                contract={contract}
                setContract={setContract}
              />
            }
          />
          <Route
            path="/Music"
            element={
              <Music
                accounts={accounts}
                setAccounts={setAccounts}
                contract={contract}
                setContract={setContract}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
