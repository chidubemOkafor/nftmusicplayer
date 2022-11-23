import {
  AiFillStepBackward,
  AiFillStepForward,
  AiOutlineLoading,
} from "react-icons/ai";
import { BsPauseCircle } from "react-icons/bs";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { TbArrowsShuffle } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { onPlay } from "react-audio-player";
import image from "../images/vidduo-high-resolution-color-logo.png";
import { ethers } from "ethers";

const Music = (props) => {
  const { accounts, contract } = props;
  const isConnected = Boolean(accounts[0]);
  const [musicName, setMusicName] = useState("john bellon hand of god");
  const [swith, setSwitch] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [spin, setSpin] = useState("mt-10 h-36 w-36 rounded-full");

  const web3Handler = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const account = accounts[0];
  };

  const loadContract = () => contract;

  const audioFile =
    "https://gateway.pinata.cloud/ipfs/QmZNRnT17a8TjsWPRtQjeCGhkMECkTSWRijKnmpq8tduC1";
  let audio = new Audio(audioFile);

  const play = () => {
    setSwitch(false);
    setSpin("motion-safe:animate-spin mt-10 h-36 w-36 rounded-full");
    return audio.play();
  };
  const pause = () => {
    setSwitch(true);
    setSpin("mt-10 h-36 w-36 rounded-full");
    return audio.pause();
  };
  // const length = "10px";
  const audioEl = useRef(null);
  return (
    <div className="flex justify-center">
      {isConnected ? (
        <div className="flex flex-col place-items-center mt-32">
          <div className="w-full bg-slate-800 shadow-md rounded px-8 pt-4 pb-8 mb-4 ">
            <p>this is the music</p>
            <div className="ml-10 mt-6 h-36 w-36 rounded-full ">
              <img className={spin} src={image} alt="image" />
            </div>
            <p className="mt-6 text-white fontFamily-ubuntu uppercase">
              {musicName}
            </p>
            <div className="w-56 mt-6 h-1 bg-white rounded">
              <div className="w-[40px] mt-6 h-1 bg-pink-600 rounded" />
            </div>
            <audio ref={audioEl}></audio>
            <div className="flex mt-6 space-x-4 text-white">
              <button>
                {" "}
                <TfiReload className="transition ease-in-out delay-150 h-8 w-8 hover:text-pink-600" />
              </button>
              <button>
                <AiFillStepBackward className="transition ease-in-out delay-150 h-8 w-8 hover:text-pink-600" />
              </button>
              {swith ? (
                <button onClick={play}>
                  <FaPlayCircle className="transition ease-in-out delay-150 justify-center items-center h-8 w-8 hover:text-pink-600" />
                </button>
              ) : (
                <button onClick={pause}>
                  <FaPauseCircle className="transition ease-in-out delay-150 text-indigo-300 justify-center items-center h-8 w-8 hover:text-pink-600" />
                </button>
              )}
              <button>
                <AiFillStepForward className="transition ease-in-out delay-150 h-8 w-8 hover:text-pink-600" />
              </button>
              <button>
                <TbArrowsShuffle className="transition ease-in-out delay-150 h-8 w-8 hover:text-pink-600" />
              </button>
            </div>
          </div>
          <button className="font-bold mt-5 w-full bg-blue-700 text-white rounded p-2 shadow-lg">
            SELL MUSIC
          </button>
        </div>
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
export default Music;
