import { RewardAbi, MplRewardsAbi, StakeAbi, RewardAddress, StakeAddress ,MplRewardsAddress} from '../../common/constansts';
export const Web3 = require("web3");

export const web3 = new Web3("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")

export async function ethEnabled() {
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  }

  export async function handleConnect(){
    var check = await ethEnabled()
    if(!check){ 
        alert('Metamask not installed')
    } else {
    }

    
}
export async function getAccount(){
  if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      var accounts = await window.web3.eth.getAccounts()
      return accounts[0]
  } else {
      return "Not Connected"
  }
}

// export async function getBalance(){
//     window.web3 = new Web3(window.ethereum);
//     var accounts = await window.web3.eth.getAccounts()
//             var RewardContract = new web3.eth.Contract(RewardAbi, RewardAddress)
//           RewardContract.methods.balanceOf(accounts[0]).call(function (err, responce) {
//             if (err) {
//               console.log("An error occured", err)
//               return
//             }
//             console.log(responce)
//             return(responce)
//           })
//           var StakeContract = new web3.eth.Contract(StakeAbi, StakeAddress)
//         StakeContract.methods.balanceOf(accounts[0]).call(function (err, res) {
//           if (err) {
//             console.log("An error occured", err)
//             return
//           }
//           console.log(res)
         
// })
// }

export async function handleGetReward(e){
    var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
    MplRewardsContract.methods.getReward().call(function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log(res);
      })
}

