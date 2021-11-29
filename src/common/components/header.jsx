
import '../../assets/scss/header.scss'
import logo from "../../assets/images/logo.svg"
import fuel from '../../assets/images/gas-pump.svg'
import arrow from '../../assets/images/arrow-down.svg'
import { useState } from 'react'
import { useAccountChange ,useNetworkChange} from "../../hooks";
import {getBalance,checkConnectionNetwork,handleConnect,checkLoggedIn,networkID} from "../../web3/action/index"

const Header = () => {
    const [visible, setVisible] = useState(false)

    // const displayAcc=address[0]+address[1]+address.slice(-4)
    let account = useAccountChange();
    const connectMeta =()=>{
        
    }
    
    return (
        <div className="navbar">
            <nav>
                <span><img className="logo" src={logo} alt="" /></span>
                <ul>
                    <li className="active">Buy ASVA</li>
                    <li>0 ETH</li>
                    {account === undefined ?
                        <li onClick={connectMeta}>connect</li>: <li>2345</li>
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
