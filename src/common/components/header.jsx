import React, { useState, useEffect } from 'react'
import '../../assets/scss/header.scss'
import logo from "../../assets/images/logo.svg"
import fuel from '../../assets/images/gas-pump.svg'
import arrow from '../../assets/images/arrow-down.svg'
import Web3 from 'web3'

import {ethEnabled ,handleConnect ,getAccount}  from '../../web3/action/index'



const Header = () => {
    var [address, setAddress]=useState([])
    var [connect, setConnect]=useState(false)
    ethEnabled();
    handleConnect();
    getAccount();
    const connectAcc =()=>{
        getAccount().then((val)=>{
            setAddress(val)
            setConnect(true)
            
        })
    }
    const [visible, setVisible] = useState(false)

    const displayAcc=address[0]+address[1]+address.slice(-4)
    
    return (
        <div className="navbar">
            <nav>
                <span><img className="logo" src={logo} alt="" /></span>
                <ul>
                    <li className="active">Buy ASVA</li>
                    <li>0 ETH</li>
                    {
                     connect ? <li >{displayAcc}</li> : <button className="connect" onClick={connectAcc}>connect</button>
                    }
                    <li className="fuel "onClick={()=>setVisible(!visible)}><img src={fuel} alt="" />95 <img src={arrow} alt="" />
                       { visible ?
                        <ul className="dropdown">
                            <span>Select Gas Setting</span>
                            <li>standerd <br />(13 Gwei)</li>
                            <li>fast <br />(15 Gwei)</li>
                            <li>instant <br />(23 Gwei)</li>
                        </ul>:null
                        }
                    </li>
                    <li>EN</li>
                </ul>
            </nav>
            
        </div>
    )
}

export default Header
