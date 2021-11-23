import React, { useState } from 'react'
import '../assets/scss/container.scss'
import {Web3, web3 } from '../web3/action';
import { RewardAbi, MplRewardsAbi, StakeAbi, RewardAddress, StakeAddress ,MplRewardsAddress} from '../common/constansts';
const Vault = () => {
    const [reward, setReward] = useState(0)
    const [totalSupply, setTotalSupply] = useState(0)
    const [bal, setBal] = useState(0)
    const [alert,setAlert] =useState(null)
    const [stake, setStake] = useState(null)
    const [unstake, setUnstake] = useState(0)
    const [toggle, setToggle] = useState("stack")

    async function getBalance(){
      window.web3 = new Web3(window.ethereum);
      var accounts = await window.web3.eth.getAccounts();
      web3.eth.getBalance(accounts[0]).then((balance)=>console.log(web3.utils.fromWei(balance)));
              var RewardContract = new web3.eth.Contract(RewardAbi, RewardAddress)
            RewardContract.methods.balanceOf(accounts[0]).call(function (err, responce) {
              if (err) {
                console.log("An error occured", err)
                
              }
              
              console.log(web3.utils.fromWei(responce));
            })
            var StakeContract = new web3.eth.Contract(StakeAbi, StakeAddress)
          StakeContract.methods.balanceOf(accounts[0]).call(function (err, res) {
            if (err) {
              console.log("An error occured", err)
              
            }
            let stakeBalance = res[0]+res[1]
            setBal(stakeBalance);
            
           
      })
    }
    async function tvl(e){
      window.web3 = new Web3(window.ethereum);
      var accounts = await window.web3.eth.getAccounts();
      var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
      var tvl =MplRewardsContract.methods.totalSupply().call({from: accounts[0]}, function(error, result){
        if (error) {
          console.log("An error occured", error)
          return
        }
        console.log(result);
        setTotalSupply(result)
      })
    }
    
    async function handleGetReward(e){
        var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
        MplRewardsContract.methods.getReward().call(function (err, res) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            console.log(res);
          })
    }
    async function handleSubmit(e) {
        var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
        
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
      .stake(parseInt(stake))
      .encodeABI(),
        },
      ],
    })
    .then((txHash) => {
        setAlert(txHash);
        setStake(0)
    })
    .catch((error) => console.log(error));
    
    }
    async function handleunstake(e) {
        var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
        
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
      .withdraw(parseInt(unstake))
      .encodeABI(),
        },
      ],
    })
    .then((txHash) => {
        setAlert(txHash);
        setStake(0)
    })
    .catch((error) => console.log(error));
    
    }
    tvl()
    getBalance()
    handleGetReward()
    const maxStake=()=>{
      setStake(bal)
    }
  return (
        <>
        {alert ? 
        <div className="alert-container-hash">
        <div className="alert alert-hash alert-warning alert-dismissible fade show text-center" role="alert">
            <a href={`https://ropsten.etherscan.io/tx/ ${alert}`} target="_blank">View Transaction on Etherscan</a>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        
        </div>
       :null
        } 
        <div className="vault-container">
            <p className="vault_head_left"><b>Vault</b></p>
            <p className="vault_head_right"><b> tvl: {totalSupply} asva</b></p>
            <div className="your_staked text-center">
                <span>you have staked</span>
                {stake === null ? <p>0 asva</p>: <p>{stake} asva</p>}
            </div>
            <div className="rewards">
            <span>rewards <p>{reward} asva</p></span>
                <p className="amount_vault">=$0.00</p>
                <button className="claim">claim</button>
            </div>
            <div className="toggel_stack">
                <button className={`toggle-btn ${toggle === "stack" ? "active":""}`} name="stack" onClick={()=>setToggle("stack")}>stake <span>asva</span></button>
                <button className={`toggle-btn ${toggle === "unstack" ? "active":""}`} name="unstack"onClick={()=>setToggle("unstack")}>unstake</button>
            </div>
            {toggle==="stack"?<>
            <div className="bal-add">
                <button onClick={maxStake}>max</button>
                <label htmlFor="">balance : <span>{bal}</span></label> <br />
                <input type="text" placeholder="Enter quantity to be staked" value={stake} onChange={(e)=>setStake(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))}/>
                
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
                <label htmlFor="">balance : <span>{bal}</span></label> <br />
                <input type="text" placeholder="0.0" value={unstake}onChange={(e)=>setUnstake(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))} />
                { bal < unstake ? <p>insufficint bal</p>:null }
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
            <button className="stake" onClick={handleunstake}>unstake</button>
            </> }   
        </div>
        </>
        
    )
}

export default Vault
