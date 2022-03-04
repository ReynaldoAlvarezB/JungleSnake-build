import React from 'react'

import '../styles/MobileButtonsSet.css'

export const MobileButtonsSet = () => {
    return (
        <div className='MobileButtonsSet'>
            <div className='MobileButtonsSet_arrows'>
                <button id='arrow_1'></button>
                <button id='arrow_2'></button>
                <button id='arrow_3'></button>
                <button id='arrow_4'></button>
                <button id='space'></button>
                <button id='enter'>Speed</button>
                {/* <button id='arrow_1'>UP</button>
                <button id='arrow_2'>LEFT</button>
                <button id='arrow_3'>RIGHT</button>
                <button id='arrow_4'>DOWN</button>
                <button id='space'>SPACE</button>
                <button id='enter'>Speed</button> */}
            </div>
            {/* <div className='MobileButtonsSet_space_enter'>
            </div> */}
        </div>
    )
}
