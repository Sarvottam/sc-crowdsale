let web3 = require('web3');
const {Transaction} = require('ethereumjs-tx');
const scConfig = require("../contract");
web3 = new web3(new web3.providers.HttpProvider(scConfig.config.web3Provider));

function signRawSignature(txdata,privateKey){
    return new Promise((resolve,reject)=>{
        var tx = new Transaction(txdata,{chain:"kovan"})
        privateKey = new Buffer(privateKey, 'hex')
        tx.sign(privateKey)
        privateKey = null
        signedTx = "0x" + tx.serialize().toString('hex')
        web3.eth.sendSignedTransaction(signedTx,(err,data) =>{
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
  
}

module.exports = {
    signRawSignature
}