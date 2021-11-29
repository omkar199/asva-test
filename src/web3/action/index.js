import { RewardAbi, MplRewardsAbi, StakeAbi, RewardAddress, StakeAddress ,MplRewardsAddress} from '../../common/constansts';
export const Web3 = require("web3");
const { ethereum } = window;
export const web3 = new Web3("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")

export const ethEnabled = () => {
  if (ethereum && ethereum.isMetaMask) {
    return true;
  }
  return false;
};
// export async function ethEnabled() {
//     if (window.ethereum) {
//       await window.ethereum.send('eth_requestAccounts');
//       window.web3 = new Web3(window.ethereum);
//       return true;
//     }
//     return false;
//   }
  export const handleConnect = async () => {
    if (ethereum && ethereum.isMetaMask) {
      return await ethEnabled();
    }
    return false;
  };
  export const fetchAccountDetails = () => {
    return new Promise(async (resolve, reject) => {
      const account = await web3.eth.requestAccounts();
      if (account.length < 1) {
        const notificaton = {
          message: "No Account Found",
          error: true,
        };
        alert("Account not Connected");
        reject(notificaton);
      } else {
        const details = {
          account: {
            address: account[0],
            balance: await web3.eth.getBalance(account[0]),
            isWhiteListed: false,
          },
          connection: {
            isConnected: true,
            network: await web3.eth.net.getNetworkType(),
            networkId: await web3.eth.net.getId(),
          },
          notification: {
            message: `BSC Testnet Network Connected`,
            error: false,
          },
        };
        resolve(details);
      }
    });
  };
  
export const checkConnectionNetwork = () => {
  return new Promise(async (resolve, reject) => {
    resolve(fetchAccountDetails());
  });
};

export const checkLoggedIn = () => {
  return new Promise(async (resolve, reject) => {
    let id = await web3.eth.net.getId();
    resolve(id);
  });
};

export const checkValidContractAddress = (address) => {
  return new Promise(async (resolve, reject) => {
    // resolve(fetchAccountDetails());
    try {
      resolve(await web3.utils.isAddress(address));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export function networkID() {
  return new Promise(async (resolve, reject) => {
    try {
      let id = await web3.eth.net.getId();
      resolve(id);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
//   export async function handleConnect(){
//     var check = await ethEnabled()
//     if(!check){ 
//         alert('Metamask not installed')
//     } else {
//       return true;
//     }

    
// }
// export async function getAccount(){
//   if (window.ethereum) {
//       await window.ethereum.send('eth_requestAccounts');
//       window.web3 = new Web3(window.ethereum);
//       var accounts = await window.web3.eth.getAccounts()
//       return accounts[0]
//   } else {
//       return "Not Connected"
//   }
// }

export async function getBalance(){
    window.web3 = new Web3(window.ethereum);
    var accounts = await window.web3.eth.getAccounts()
          //   var RewardContract = new web3.eth.Contract(RewardAbi, RewardAddress)
          // RewardContract.methods.balanceOf(accounts[0]).call(function (err, responce) {
          //   if (err) {
          //     console.log("An error occured", err)
          //     return
          //   }
          //   console.log(responce)
          //   return(responce)
          // })
        var StakeContract = new web3.eth.Contract(StakeAbi, StakeAddress)
        StakeContract.methods.balanceOf(accounts[0]).call(function (err, res) {
          if (err) {
            console.log("An error occured", err)
            return
          }
          return res
         
})
}

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

