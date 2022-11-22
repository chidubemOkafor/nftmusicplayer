import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseCircle } from "react-icons/bs";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { TbArrowsShuffle } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import { useState } from "react";

const Music = () => {
  const [musicName, setMusicName] = useState("john bellon hand of god");
  return (
    <div className="flex justify-center">
      <div className="flex flex-col place-items-center mt-32">
        <div className="w-full bg-blue-700 shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <p>this is the music</p>
          <div className="ml-12 mt-6 h-32 w-32 rounded-full bg-white"></div>
          <p className="mt-6 text-white fontFamily-ubuntu uppercase">
            {musicName}
          </p>
          <div className="w-56 mt-6 h-1 bg-white rounded"></div>
          <div className="flex mt-6 space-x-4 text-white">
            <TfiReload className="h-8 w-8" />
            <AiFillStepBackward className="h-8 w-8" />
            <FaPauseCircle className="justify-center items-center h-8 w-8" />
            <AiFillStepForward className="h-8 w-8" />
            <TbArrowsShuffle className="h-8 w-8" />
          </div>
        </div>
        <button className="font-bold mt-5 w-full bg-blue-700 text-white rounded p-2 shadow-lg">
          SELL MUSIC
        </button>
      </div>
    </div>
  );
};
export default Music;
