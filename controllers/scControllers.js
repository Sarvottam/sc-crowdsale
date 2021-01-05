let web3 = require('web3');
const {Transaction} = require('ethereumjs-tx');

const scConfig = require("../contract")
const {prepareTransactionBody} = require("../utils/solidityFunctionSignature")
const {signRawSignature} = require("../utils/signSignature")

web3 = new web3(new web3.providers.HttpProvider(scConfig.config.web3Provider));

var contract = new web3.eth.Contract(scConfig.abi,scConfig.config.contractAddress);

module.exports = {
    getDecimal : (req,res) =>{
        console.log("Here inside get Decimal")
        contract.methods.decimals().call((err,data)=>{
            if(!err){
                return _handleResponse(req,res,null, data)
            }else{
                return _handleResponse(req,res,err)
            }
        })
      

    },
    purchaseToken:(req,res) =>{
        let privateKey = req.body.privateKey;
        const receipientAddress = req.body.receipientAddress;
        const pubKey = web3.eth.accounts.privateKeyToAccount(privateKey);
        console.log("Public Key ",pubKey)

        const amount = req.body.amount || 0;
        var functionParams = contract.methods.purchaseToken().encodeABI()
        prepareTransactionBody(scConfig.config.contractAddress,pubKey.address,amount,functionParams).then(async(txdata)=>{
         signRawSignature(txdata,privateKey).then(data=>{
            return _handleResponse(req,res,null, data)
         }).catch(e=>{
            return _handleResponse(req,res,e)
         });
        }).catch(e=>{
            return _handleResponse(req,res,e)
        })
        

    },
    transferToken:(req,res) =>{
        try{
            let privateKey = req.body.privateKey;
            const receipientAddress = req.body.receipientAddress;
            const amount = req.body.amount || 0;
            const tokenAmount = req.body.token;
            var functionParams = contract.methods.transfer(receipientAddress,tokenAmount.toString()).encodeABI()
            prepareTransactionBody(scConfig.config.contractAddress,receipientAddress,amount.toString(),functionParams).then(async(txdata)=>{
             signRawSignature(txdata,privateKey).then(data=>{
                return _handleResponse(req,res,null, data)
             }).catch(e=>{
                 console.log(Error ,e)
                return _handleResponse(req,res,e)
             });
            }).catch(e=>{
                console.log("Errror ",e)
                return _handleResponse(req,res,e)
            })
        }catch(e){
            console.log("Errror ",e)
        }

        
    }
}