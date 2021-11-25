import React, { useState } from 'react'
import '../assets/scss/container.scss'
import {Web3, web3 } from '../web3/action';
import {persentStake} from "../web3/action/common"
import { RewardAbi, MplRewardsAbi, StakeAbi, RewardAddress, StakeAddress ,MplRewardsAddress} from '../common/constansts';
const Vault = () => {
    const [reward, setReward] = useState()
    const [totalSupply, setTotalSupply] = useState(0)
    const [bal, setBal] = useState(0)
    const [alert,setAlert] =useState(null)
    const [stake, setStake] = useState(null)
    const [unstake, setUnstake] = useState(0)
    const [toggle, setToggle] = useState("stack")
    const [unstakebal, setUnstakebal] = useState(10)
    const [yourstake, setYourstake] = useState(10)




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
        //balanceof (account[0])
        if (error) {
          console.log("An error occured", error)
          return
        }
        console.log(result);
        setTotalSupply(result)
      })
    }
    async function handleGetReward(e){
      window.web3 = new Web3(window.ethereum);
      var accounts = await window.web3.eth.getAccounts();
        var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
        MplRewardsContract.methods.earned(accounts[0]).call(function (err, res) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            setReward(res);
          })
    }
    async function youHaveStake(e){
      window.web3 = new Web3(window.ethereum);
      var accounts = await window.web3.eth.getAccounts();
        var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
        MplRewardsContract.methods.balanceOf(accounts[0]).call(function (err, res) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            setYourstake(res);
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
    async function claimReward(e) {
      if(stake === NaN){setStake(0)}else{
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
      .getReward()
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
    }
    tvl()
    getBalance()
    handleGetReward()
    youHaveStake()
    const calPercent =(val,percent)=>{
      setUnstake(persentStake(val,percent)); }
    const maxStake=()=>{
      setStake(bal)
    }
  return (
        <>
        {alert ? 
        <div className="alert-container-hash">
        <div className="alert alert-hash alert-warning alert-dismissible fade show text-center" role="alert">
            <a href={`https://rinkeby.etherscan.io/tx/ ${alert}`} target="_blank">View Transaction on Etherscan</a>
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
                <p>{yourstake} asva</p>
                {/* {stake === null ? : <p>{reward}asva</p>} */}
            </div>
            <div className="rewards">
            <span>rewards <p> {reward}asva</p></span>
                <p className="amount_vault">=$0.00</p>
                <button className="claim" onClick={claimReward} >claim</button>
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
                        <p>14%</p>
                        <span>60 days</span>
                    </div>
                    <div>
                        <p>16%</p>
                        <span>90 days</span>
                    </div>
                    <div>
                        <p>18%</p>
                        <span>120 days</span>
                    </div>
                </div>
            </div>
            <button className="stake" onClick={handleSubmit}>stake</button>
            </>:
            <>
            <div className="bal-add">
                <label htmlFor="">balance : <span>{bal}</span></label> <br />
                <input type="text" placeholder="0.0" value={unstake}onChange={(e)=>setUnstake(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))} />
         
                        { parseFloat(totalSupply) < parseFloat(unstake) ? <p>insufficint bal</p>:null }
            </div>
            <div className="bal-add-buttom extra-bottom">
                
                <div>
                    <div onClick={()=>calPercent(yourstake,25)}>
                        <p>25%</p>
                    </div>
                    <div onClick={()=>calPercent(yourstake,50)}>
                        <p>50%</p>
                    </div>
                    <div onClick={()=>calPercent(yourstake,75)}>
                        <p>75%</p>
                    </div>
                    <div onClick={()=>calPercent(yourstake,100)}>
                        <p>100%</p>
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
