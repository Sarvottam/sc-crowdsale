const { abi: contractABI } = require("../contract");
let web3 = require("web3");
const scConfig = require("../contract");
web3 = new web3(new web3.providers.HttpProvider(scConfig.config.web3Provider));

function getFunctionSignature(functionName) {
  return new Promise((resolve, reject) => {
    contractABI.forEach((dataObj) => {
      if (dataObj.type === "function" && dataObj.name == functionName) {
        resolve(dataObj);
      }
    });
    resolve({});
  });
}

async function prepareTransactionBody(addressTo, addressFrom, ethValue, data) {
  return new Promise(async (resolve, reject) => {
    try {
      // construct the transaction data
      console.log("Data here ");
      let nonce = await web3.eth.getTransactionCount(addressFrom, "pending");
      const txData = {
        nonce: nonce,
        gasLimit: web3.utils.toHex(215000),
        gasPrice: web3.utils.toHex(10e9), // 10 Gwei
        to: addressTo,
        from: addressFrom,
        value: web3.utils.toHex(web3.utils.toWei(ethValue, "ether")),
        data: data,
        chainId: 42,
      };
      resolve(txData);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = { getFunctionSignature, prepareTransactionBody };
