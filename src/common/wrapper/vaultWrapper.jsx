import React from 'react'
import Vault from '../../container/vault'
import VaultStatic from '../../container/vaultStatic'
import Sidebar from '../components/sidebar'

const VaultWrapper = () => {
    return (
        <>
        <div className="vault-wrapper">
            <Sidebar/>
            <Vault/>
            <VaultStatic/>
            
        </div>
        <div className="buttom_button"></div>
        </>
    )
}

export default VaultWrapper
