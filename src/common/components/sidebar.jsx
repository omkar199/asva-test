import React from 'react'
import "../../assets/scss/header.scss"
import dashImg from '../../assets/images/dashbord/dashbord.svg'
import asvapadImg from '../../assets/images/dashbord/asvapad.svg'
import borrowImg from '../../assets/images/dashbord/borrow.svg'
import docsImg from '../../assets/images/dashbord/docs.svg'
import historyImg from '../../assets/images/dashbord/history.svg'
import lendImg from '../../assets/images/dashbord/lend.svg'
import poolImg from '../../assets/images/dashbord/pool.svg'
import swapImg from '../../assets/images/dashbord/swap.svg'
import vaultImg from '../../assets/images/dashbord/vault.svg'

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <ul>
                <li><img src={dashImg} alt="" /><a href="#">dashboard</a>   <span>comming soon</span></li>
                <li><img src={swapImg} alt="" /><a href="#">swap</a> </li>
                <li className="actice-bar"><img src={vaultImg} alt="" /><a href="#">vault</a> </li>
                <li><img src={poolImg} alt="" /><a href="#">pool</a> <span>comming soon</span></li>
                <li><img src={lendImg} alt="" /><a href="#">lend</a> <span>comming soon</span></li>
                <li><img src={borrowImg} alt="" /><a href="#">borrow</a> <span>comming soon</span></li>
                <li><img src={asvapadImg} alt="" /><a href="#">asva pad</a><span>comming soon</span></li>
                <li><img src={historyImg} alt="" /><a href="#">history</a> </li>
                <li><img src={docsImg} alt="" /><a href="#">doc</a> </li>
            </ul>
            
        </div>
    )
}

export default Sidebar
