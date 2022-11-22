import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseCircle } from "react-icons/bs";

const Music = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col place-items-center mt-32">
        <div className="w-64 bg-blue-700 shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <p>this is the music</p>
          <div className="ml-7 mt-6 h-32 w-32 rounded-full bg-white"></div>
          <div className="flex mt-6 space-x-7 text-white">
            <AiFillStepBackward className="h-12 w-12" />
            <BsPauseCircle className="h-10 w-10" />
            <AiFillStepForward className="h-12 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Music;
