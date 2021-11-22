import React, { useState, useEffect } from 'react'
import '../../assets/scss/header.scss'
import logo from "../../assets/images/logo.svg"
import fuel from '../../assets/images/gas-pump.svg'
import arrow from '../../assets/images/arrow-down.svg'
import Web3 from 'web3'



async function getAccount(){
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        var accounts = await window.web3.eth.getAccounts()
        return accounts[0]
    } else {
        return "Not Connected"
    }
}

const Header = () => {
    useEffect(() => {
        getAccount()
    }, [])
    var [address, setAddress]=useState([])
   
    getAccount().then((val)=> {
        console.log(val)
        setAddress(val)
    })
    const [visible, setVisible] = useState(false)
    const dropdown=()=>{
        if(visible === false){
            setVisible(true)
        }else{
            setVisible(false)
        }
    }
    const displayAcc=address[0]+address[1]+address.slice(-4)

    return (
        <div className="navbar">
            <nav>
                <span><img className="logo" src={logo} alt="" /></span>
                <ul>
                    <li className="active">Buy ASVA</li>
                    <li>0 ETH</li>
                    <li>{displayAcc}</li>
                    <li className="fuel "onClick={dropdown}><img src={fuel} alt="" />95 <img src={arrow} alt="" />
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
