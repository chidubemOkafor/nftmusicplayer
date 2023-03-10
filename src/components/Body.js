import "../index.css";
import { AiOutlineLoading } from "react-icons/ai";
import projectLogo from "../images/vidduo-high-resolution-logo-color-on-transparent-background.png";
import { Player } from "video-react";
import { useState } from "react";

const Body = (props) => {
  const { accounts, setAccounts } = props;
  const isConnected = Boolean(accounts[0]);

  return (
    <div className="flex justify-center">
      {isConnected ? (
        <div>videos will be here</div>
      ) : (
        <div className="flex mt-48">
          <AiOutlineLoading className=" animate-spin text-blue-700 h-10 w-10" />{" "}
          <p className=" fontFamily-ubuntu text-2xl text-slate-300 ml-2">
            collect to metamask
          </p>
        </div>
      )}
    </div>
  );
};
export default Body;
