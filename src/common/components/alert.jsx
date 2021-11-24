import React from 'react';
import '../../assets/scss/pages.scss'


const Alert = () => {
    return (
        <div className="alert-container">
        <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
            Asva Finance is in beta. Please trade at your own risk level.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        
        </div>
    )
}

export default Alert
