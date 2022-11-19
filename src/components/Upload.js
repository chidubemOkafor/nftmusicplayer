import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./piniata.js";
import Marketplace from "./Marketplace.json";
import { AiOutlineLoading } from "react-icons/ai";
import { useLocation } from "react-router";

function Upload(props) {
  const { accounts } = props;
  const isConnected = Boolean(accounts[0]);

  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const location = useLocation();

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    let file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) return;

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage("Please wait.. uploading (upto 5 mins)");

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits(formParams.price, "ether");
      let listingPrice = ethers.utils.parseEther("0.02");
      //actually create the NFT
      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });
      await transaction.wait();

      alert("Successfully listed your NFT!");
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      window.location.replace("/");
    } catch (e) {
      alert("Upload error" + e);
    }
  }

  console.log("Working", process.env);
  return (
    <div className="flex justify-center">
      {isConnected ? (
        <div className="flex flex-col place-items-center mt-32">
          <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center fontFamily-ubuntu font-bold text-blue-700 mb-8">
              Upload your video/audio
            </h3>
            <div className="mb-4">
              <label
                className="block text-blue-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="write a name here (john doe)"
                onChange={(e) =>
                  updateFormParams({ ...formParams, name: e.target.value })
                }
                value={formParams.name}
              ></input>
            </div>
            <div className="mb-6">
              <label
                className="block text-blue-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                cols="40"
                rows="5"
                id="description"
                type="text"
                placeholder="write something here"
                value={formParams.description}
                onChange={(e) =>
                  updateFormParams({
                    ...formParams,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                className="block text-blue-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price (in ETH)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Min 0.01 ETH"
                step="0.01"
                value={formParams.price}
                onChange={(e) =>
                  updateFormParams({ ...formParams, price: e.target.value })
                }
              ></input>
            </div>
            <div>
              <label className="block text-blue-700 text-sm font-bold mb-2">
                Select file
              </label>
              <input type={"file"} onChange={OnChangeFile}></input>
            </div>
            <div className="text-green text-center">{message}</div>
            <button
              onClick={listNFT}
              className="font-bold mt-10 w-full bg-blue-700 text-white rounded p-2 shadow-lg"
            >
              Upload File
            </button>
          </form>
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
}

export default Upload;
