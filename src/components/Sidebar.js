import { TbHome } from "react-icons/tb";
import { RiMusic2Line } from "react-icons/ri";
import { FaRegQuestionCircle } from "react-icons/fa";
import { SiMarketo } from "react-icons/si";
import { BiBlanket, BiMenu, BiX } from "react-icons/bi";
import { useState } from "react";
import Identicon from "react-identicons";

const SideBar = ({ accounts, setAccounts }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isConnected = Boolean(accounts[0]);
  const handleConnect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };

  const Open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };
  return (
    <div>
      {!isOpen ? (
        <button onClick={Open}>
          <BiMenu className="w-14 h-14 pr-5 pt-4 ml-10 text-sky-500 fixed top-4 left-4" />
        </button>
      ) : (
        <div className=" top-0 left-0 h-full w-64 fixed bg-zinc-800 ">
          <div>
            <button onClick={close} className="">
              <BiX className="w-14 h-14 pr-5 pt-4 ml-10 text-sky-500 animate-bounce" />
            </button>
            {isConnected ? (
              <div className="h-24 w-24 ml-20 rounded-full bg-sky-500 ">
                <Identicon className="h-10 w-10" string="randomness" />
              </div>
            ) : (
              <div className="h-24 w-24 ml-20 rounded-full bg-white-500 "></div>
            )}

            <br className="bg-sky-500" />
            <div className="fixed">
              <div className="flex pt-5">
                {" "}
                <TbHome className="w-12 h-12 pr-5 pt-4 ml-10 text-sky-500" />
                <p className="font-ubuntu font-bold text-lg pt-4 flex text-white">
                  Home
                </p>
              </div>
              <div className="flex pt-5">
                {" "}
                <RiMusic2Line className="w-12 h-12 pr-5 pt-4 ml-10 text-sky-500 " />
                <p className="font-ubuntu font-bold text-lg pt-4 flex text-white">
                  Music
                </p>
              </div>
              <div className="flex pt-5">
                {" "}
                <SiMarketo className="w-12 h-12 pr-5 pt-4 ml-10 text-sky-500" />
                <p className="font-ubuntu font-bold text-lg pt-4 flex text-white">
                  Marketplace
                </p>
              </div>
              <div className="flex pt-5">
                {" "}
                <FaRegQuestionCircle className="w-12 h-12 pr-5 pt-4 ml-10 text-sky-500" />
                <p className="font-ubuntu font-bold text-lg pt-4 flex text-white">
                  About
                </p>
              </div>
              <div className="flex pt-4 ">
                <BiBlanket className="w-12 h-12 pr-5 pt-4 ml-10 text-sky-500" />
                <button
                  className="font-ubuntu font-bold text-lg pt-4 flex text-white"
                  onClick={handleConnect}
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SideBar;
