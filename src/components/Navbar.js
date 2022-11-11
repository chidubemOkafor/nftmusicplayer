import { BiBlanket } from "react-icons/bi";
import "../index.css";
const Navbar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  const handleConnect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };

  return (
    <div className="flex bg-zinc-800 h-20 justify-between drop-shadow-md fixed">
      <p className="pt-6 pl-5 text-2xl space-y-48">musicplayer</p>
      {isConnected ? (
        <BiBlanket className="w-12 h-12 pr-5 content-center text-red-500" />
      ) : (
        <button className=" " onClick={handleConnect}>
          <div className="flex">
            <BiBlanket className="w-12 h-12 pr-5 content-center text-sky-500" />
          </div>
        </button>
      )}
    </div>
  );
};

export default Navbar;
