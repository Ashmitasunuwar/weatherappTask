import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import '../css/style.css'
import { WiHumidity } from "react-icons/wi";
import { GiPaperWindmill } from "react-icons/gi";

function ForeCast({ obj }) {
    // const date = new Date(obj.time);
    // console.log(date);

    let AM = 'am'
    let PM = 'pm'

    let time = obj.time;
    console.log('comp Fore--Cast', time)

    const dt = new Date(time);
    let hr = dt.getHours();
    console.log(dt);
    return (<div className='forecast-item'>
        <div className='parentCon'>
            <div>
                <h3>{hr}:00</h3>
            </div>
            <div>
                <h4>{obj.temp_c}°C</h4>
            </div>
            <div>  <WiHumidity style={{ color: 'blue' }} /> {obj.humidity}</div>
            <div>
                <GiPaperWindmill /> {obj.condition.text}
            </div>
        </div>
    </div>)

}




export default ForeCast