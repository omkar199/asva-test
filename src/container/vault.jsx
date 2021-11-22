import React, { useState } from 'react'
import '../assets/scss/container.scss'
import { RewardAbi, MplRewardsAbi, StakeAbi, RewardAddress, StakeAddress ,MplRewardsAddress} from '../common/constansts';
const Web3 = require("web3");

const web3 = new Web3("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")

async function ethEnabled() {
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  }

  async function handleConnect(){
    var check = await ethEnabled()
    if(!check){ 
        alert('Metamask not installed')
    } else {
    }

    
}

async function getBalance(){
    window.web3 = new Web3(window.ethereum);
    var accounts = await window.web3.eth.getAccounts()
            var RewardContract = new web3.eth.Contract(RewardAbi, RewardAddress)
          RewardContract.methods.balanceOf(accounts[0]).call(function (err, res) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            //this.setState(state => ({rewBal: res}))
            console.log(res)
          })
          var StakeContract = new web3.eth.Contract(StakeAbi, StakeAddress)
        StakeContract.methods.balanceOf(accounts[0]).call(function (err, res) {
          if (err) {
            console.log("An error occured", err)
            return
          }
          console.log(res)
         
})
}

const Vault = () => {

    handleConnect()
    getBalance()
    
    
    const [text, setText] = useState()
    const [toggle, setToggle] = useState("stack")
    
    async function handleGetReward(e){
        var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
        MplRewardsContract.methods.getReward().call(function (err, res) {
            if (err) {
              console.log("An error occured", err)
              return
            }
          })
    }
    console.log(text);
    async function handleSubmit(e) {
        var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
        // MplRewardsContract.methods.stake(this.state.text).call(function (err, res) {
        //     if (err) {
        //       console.log("An error occured", err)
        //       return
        //     }
        //   })
          var accounts = await window.web3.eth.getAccounts()
          window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: MplRewardsAddress,
          value: '0x00',
          gasPrice: '0x09184e72a000',
          gas: '30000',
          data: MplRewardsContract.methods
      .stake(parseInt(text))
      .encodeABI(),
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
    }
  

    
  
   
    return (
        
        <div className="vault-container">
            <p className="vault_head_left"><b>Vault</b></p>
            <p className="vault_head_right"><b> tvl:$232,300</b></p>
            <div className="your_staked text-center">
                <span>you have staked</span>
                <p>0 asva</p>

            </div>
            <div className="rewards">
            <span>rewards <p>0 asva</p></span>
                <p className="amount_vault">=$0.00</p>
                <button className="claim">claim</button>
            </div>
            <div className="toggel_stack">
                <button className={`toggle-btn ${toggle === "stack" ? "active":""}`} name="stack" onClick={()=>setToggle("stack")}>stake <span>asva</span></button>
                <button className={`toggle-btn ${toggle === "unstack" ? "active":""}`} name="unstack"onClick={()=>setToggle("unstack")}>unstake</button>
            </div>
            {toggle==="stack"?<>
            <div className="bal-add">
                <button>max</button>
                <label htmlFor="">balance :<span>0</span></label> <br />
                <input type="text" placeholder="Enter quantity to be staked"onChange={(e)=>setText(parseInt(e.target.value))}/>
                
            </div>
            <div className="bal-add-buttom">
                <label htmlFor="">APY | Lockin Time</label>
                <div>
                    <div>
                        <p>12%</p>
                        <span>30 days</span>
                    </div>
                    <div>
                        <p>12%</p>
                        <span>30 days</span>
                    </div>
                    <div>
                        <p>12%</p>
                        <span>30 days</span>
                    </div>
                    <div>
                        <p>12%</p>
                        <span>30 days</span>
                    </div>
                </div>
            </div>
            <button className="stake" onClick={handleSubmit}>stake</button>
            </>:
            <>
            <div className="bal-add">
                <label htmlFor="">balance :<span>0</span></label> <br />
                <label className="unstack"htmlFor="">0.0</label>
            </div>
            <div className="bal-add-buttom extra-bottom">
                
                <div>
                    <div>
                        <p>12%</p>
                    </div>
                    <div>
                        <p>12%</p>
                    </div>
                    <div>
                        <p>12%</p>
                    </div>
                    <div>
                        <p>12%</p>
                    </div>
                </div>
            </div>
            <button className="stake">unstake</button>
            </> }   
            

            

        </div>
        
        
    )
}

export default Vault
