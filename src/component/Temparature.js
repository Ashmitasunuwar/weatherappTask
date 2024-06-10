import React, { useEffect, useState } from 'react'
import { FaStreetView } from "react-icons/fa";
import weathericon from '../images/weathericon.jpeg'
import '../css/style.css';
import shining from '../images/shining.jpeg';
import { MdLocationSearching } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { GiPaperWindmill } from "react-icons/gi";
import ForeCast from './ForeCast';

function Temparature() {

    const [city, setCity] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [background, setBackground] = useState(shining)
    const [searchTerm, setSearchTerm] = useState({
        name: '',
        region: '',
        country: '',
        temparature: '',
        time: '',
        cloud: '',
        text: '',
        aircondition: '',
        humidity: '',
        wind: '',
        min_temp: '',
        mx_temp: ''
    });
    const [hour, setHour] = useState([]);

    useEffect(() => {
        fetch('https://api.ipify.org').then(response => response.text()).then(res => setIpAddress(res));
    }, [])
    const fetchIpinfO = async () => {
        await fetch(`http://ip-api.com/json/${ipAddress}`).then(response => response.json())
            .then(res => {
                setCity(res.city)

            })
    }
    useEffect(() => {
        if (ipAddress) {
            fetchIpinfO();
        }
    }, [ipAddress])
    useEffect(() => {
        console.log('hour arr ', hour)
    }, [hour])

    useEffect(() => {
        if (city) {
            fetchTemp();
        }

    }, [city])

    useEffect(() => { console.log('hrs', hour); }, [hour])


    const FORECAST = `http://api.weatherapi.com/v1/forecast.json?key=b9c6c403476b4907888103557240606&q=`;

    const fetchTemp = async () => {

        if (city) {
            await fetch(FORECAST + `${city}` + `&days=2&aqi=no&alerts=no`).then(response => response.json())
                .then(result => {
                    console.log("result forecast ", result)
                    if (result.forecast) {

                        setHour(hour.concat(result.forecast.forecastday[0].hour, result.forecast.forecastday[1].hour));
                        setSearchTerm({
                            name: result.location.name,
                            region: result.location.region,
                            country: result.location.country,
                            temparature: result.current.temp_c,
                            time: result.location.localtime,
                            cloud: result.current.cloud,
                            text: result.current.condition.text,
                            aircondition: result.current.airquality,
                            humidity: result.current.humidity,
                            wind: result.current.wind_kph,
                            mx_temp: result.forecast.forecastday[0].day.maxtemp_c,
                            min_temp: result.forecast.forecastday[0].day.mintemp_c,
                            date: result.forecast.forecastday[0].date,
                        })
                    }
                })
        }
    }
    const backGrdStyle = {
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    const handleSetCity = (event) => {
        setCity(event.target.value);
    }

    const dayOfWeek = () => {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let forecastDate = new Date(searchTerm.date);
        return dayNames[forecastDate.getDay()]
    }
    const date = new Date(searchTerm.time)
    console.log(date);
    const totalsHours = Math.floor(date.getHours() + (date.getMinutes() / 60) + (date.getSeconds() / 3600))
    console.log('totalHors', totalsHours);

    let arr = [];



    const renderedCard = () => {
        if (hour) {
            hour.map((obj, index) => {
                if (index === totalsHours) {
                    let i = 1;
                    do {
                        //   console.log("111 ", totalsHours, index + i)
                        arr.push(hour[(index + i)])
                        i++;

                    } while (i <= 5)
                }

            })
            return true;
        }
        else {
            return false
        }
    }

    const renderprofileCard = () => {
        console.log('@card comp called ', arr)
        if (renderedCard()) {
            const abc = arr.map(
                (obj, i) => {
                    console.log('renderprofileCard', obj)
                    return (<ForeCast className='ForeCastObj' key={i} obj={obj} />)
                }
            )
            return abc;
        }
        else {
            console.log('arr not print ', arr)
        }

    }

    return (
        <div style={backGrdStyle}>
            <div className='container outerdiv' >

                <div className='row firstrow' >
                    <input className='col-4 inputfield' type='search' value={city} onChange={(e) => { handleSetCity(e) }} />
                </div>

                <div className=' row information'>
                    <div>
                        <div>
                            <img className='weatherIcon' src={weathericon} height={65} width={65} alt='image not found' />

                            <div className='weatherToday'>
                                <h6>  {searchTerm.date}</h6>
                                {dayOfWeek()}
                            </div>
                        </div>

                        <h2 className='secondh2'>

                            <FaStreetView className='streetIcon' />

                            <span>{city}</span>
                        </h2>

                        <h3 style={{ color: '#70757a' }}>Temparature: {searchTerm.temparature}°C

                        </h3>
                    </div>

                    <div>
                        <h6> <WiHumidity style={{ color: 'blue' }} /> humidity: {searchTerm.humidity} %
                        </h6>
                        <h6><GiPaperWindmill style={{ color: 'blue' }} />wind: {searchTerm.wind} km/hr
                        </h6>
                        <h6>
                            {searchTerm.text}
                        </h6>
                        <p className='para'>min:{searchTerm.min_temp}°C || max:{searchTerm.mx_temp}°C</p>
                    </div>
                </div>

            </div>
            <h3 className='Titletag'>Upcoming weather predictions</h3>
            <div className='forecastDays'>

                {renderprofileCard()}
            </div>
        </div>
    )
}

export default Temparature