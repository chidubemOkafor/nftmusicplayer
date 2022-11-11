import { TbHome } from "react-icons/tb";
import { RiMusic2Line } from "react-icons/ri";
import { FaRegQuestionCircle } from "react-icons/fa";
import { SiMarketo } from "react-icons/si";
import Identicon from "react-identicons";

const SideBar = () => {
  return (
    <div className="h-screen w-64 resize-x bg-zinc-800 ">
      <div>
        <div className="h-24 w-24 ml-20 rounded-full bg-sky-500 ">
          <Identicon string="randomness" />
        </div>
        <br className="text-sky-500" />
        <div>
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
        </div>
      </div>
    </div>
  );
};
export default SideBar;
