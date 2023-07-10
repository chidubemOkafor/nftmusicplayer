import axios from "axios";
import FormData from "form-data";

//require('dotenv').config();
const REACT_APP_PINATA_KEY = process.env.REACT_APP_PINATA_KEY;
const REACT_APP_PINATA_SECRET = process.env.REACT_APP_PINATA_SECRET;

export const uploadJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: "9f6124bf684ceddff015",
        pinata_secret_api_key:
          "312e8f068b1512607bcaba6c07494195af004ca665b08354542c61f32d4f659b",
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataURL: `https://gateway.pinata.cloud/ipfs/ ${response.data.IpfsHash} `,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const uploadFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //making axios POST request to Pinata ⬇️

  let data = new FormData();
  data.append("file", file);

  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMetadata", metadata);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append("pinataOptions", pinataOptions);

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: "9f6124bf684ceddff015",
        pinata_secret_api_key:
          "312e8f068b1512607bcaba6c07494195af004ca665b08354542c61f32d4f659b",
      },
    })
    .then((response) => {
      console.log("image uploaded", response.data.IpfsHash);
      return {
        success: true,
        pinataURL: `https://gateway.pinata.cloud/ipfs/ ${response.data.IpfsHash} `,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
