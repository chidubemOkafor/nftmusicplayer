import "../index.css";
import projectLogo from "../images/vidduo-high-resolution-logo-color-on-transparent-background.png";
import { Player } from "video-react";
import { useState } from "react";

const Body = (props) => {
  const { accounts, setAccounts } = props;
  const isConnected = Boolean(accounts[0]);

  return (
    <div className=" h-screen justify-between item-center">
      <div className=" justify-between item-center">
        {isConnected ? (
          <div className="fixed">
            <div>
              <Player className="content-center w-[80vh] h-[40vh] pb-48 text-center justify-between item-center">
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
              </Player>
            </div>
            <div>
              <button>listen to music</button>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-ubuntu text-5xl">Wallet is not Connected</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Body;
