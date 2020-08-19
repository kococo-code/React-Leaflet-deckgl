import React from 'react';

export default function Toast(props){
    function MakeToast(msg,type="Notification"){
        // types = ["Error","Notification"];
        const MainElement = document.getElementById('Toasts');
        const targetToast = document.createElement('div');
        targetToast.setAttribute('class',`toast ${type} `);
    }
    return(
        <div id="Toasts">
            <div className="toast Notification"></div>
            <div className="toast Error">Not Found</div>

        </div>
    )


}