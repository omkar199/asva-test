import React from 'react'
import Vault from '../../container/vault'
import VaultStatic from '../../container/vaultStatic'

const VaultWrapper = () => {
    return (
        <>
        <div className="vault-wrapper">
             
            <Vault/>
            <VaultStatic/>
            
        </div>
        <div className="buttom_button"></div>
        </>
    )
}

export default VaultWrapper
