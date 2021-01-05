pragma solidity >=0.7.0 <0.8.0;

import  "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract ZeroHour is ERC20 {
     using SafeMath for uint256;
    
     uint256 public tokenRatePerUnit = 1000;
     uint256 public tokenDecimal = 1000000000000000000;
     uint256 public ETHCapAmount= 10 ether;
     uint256 public maxPerUserETHLimit = 0.5 ether;
     uint256 percentageBurn = 2*10;
     uint256 private totalETHReceived;
     
     event TokenTransfered(address indexed from, uint256 value);
     event CheckETH(bool ethValues);
     
     mapping (address => uint256) private ethSpentBy;

 
     constructor(string memory name, string memory symbol) ERC20(name,symbol) public { }
 
 
     function checkValidAmount( uint weiAmountSent) public returns(bool){
     uint256 previousBalance = ethSpentBy[msg.sender];
   
      if(weiAmountSent.add(totalETHReceived)> ETHCapAmount ){
         revert("Crossing ETHCapAmount Limit");
     } 
     
     if(weiAmountSent.add(previousBalance) > maxPerUserETHLimit ){
         revert("Max per user Limit will be crossed");
      }
  
     return true;
     }
 
    function purchaseToken() public payable {
     
     require(msg.value>0);
     uint256 tokenToMint = tokenRatePerUnit.mul(msg.value);
    
     if(checkValidAmount(msg.value)){
        ERC20._mint(msg.sender,tokenToMint);
        totalETHReceived += msg.value;
        ethSpentBy[msg.sender] += msg.value;
     }
     emit TokenTransfered(msg.sender, tokenToMint.div(tokenDecimal));
    }
    
    function transfer(address recipientAddress, uint256 amount) public  override returns (bool) {
        amount = amount*tokenDecimal;
        uint256 burn_token = (amount.mul(percentageBurn).div(100));
        require(balanceOf(msg.sender) >=amount+burn_token );
        _burn(msg.sender,burn_token);
        _transfer(_msgSender(), recipientAddress, amount);
        return true;
    }

}
