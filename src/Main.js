import Header from './Header';
import Day from './img/logo-clouds.png';
import WindLogo from './img/logo-wind.png';

const  Main = (props) => {

    const onSubmit = event => {
        event.preventDefault();
        props.onSubmit(event.target.cityInput.value);
    }

    const {city, country, localTime, 
    updated, temperatureC, temperatureF,
    isDay, condition, windSpeed, windDirection, 
    pressure, feelsLikeC, feelsLikeF, visibility,
    humidity, ballPosition, aqiColor, pm2_5} = props.state;

    return(
        <>
            <div className="main-wrap">
                <div className="main-content">
                    <form onSubmit={onSubmit}>
                        <input type="text" name='cityInput' placeholder="What's your city?"/>
                        <button>Search</button>
                    </form>
                    <p className="updated">Updated: {updated} <br/> Local time: {localTime}</p>
                    <div className="big-tiles">
                        <div className="tile">
                            <div className="city-info">
                                <div className="weather-logo">
                                <img src={Day} alt="clouds logo" />
                                </div>
                                <div>
                                    <div className="top">{city}</div>
                                    <div className="bottom">{country}</div>
                                </div>
                            </div>
                            <div className="weather-main-info">
                                <div className="top">{temperatureC}°C
                                    <span>{temperatureF}°F</span></div>
                                <div className="bottom">{condition}</div>
                            </div>
                            <div className="weather-specific-info">
                                <div className="specific-info-tile">
                                    <p className="tile-label">Pressure</p>
                                    <p className="tile-data">{pressure}mb</p>
                                </div>
                                <div className="specific-info-tile">
                                    <p className="tile-label">Visibility</p>
                                    <p className="tile-data">{visibility}km</p>
                                </div>
                                <div className="specific-info-tile">
                                    <p className="tile-label">Humidity</p>
                                    <p className="tile-data">{humidity}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="tile">
                            <div className="city-info">
                                <div className="weather-logo">
                                <img src={WindLogo} alt="wind logo" />
                                </div>
                                <div>
                                    <div className="top">Air quality</div>
                                    <div className="bottom">Pollution: PM 2.5: {pm2_5}</div>
                                </div>
                            </div>
                            <div className="weather-main-info">
                                <div className="top">Wind</div>
                                <div className="bottom">{windSpeed} km/h {windDirection}</div>
                            </div>
                            <div className="weather-specific-info">
                                <div className="long-tile">
                                    <div className="label">
                                        <p>Good</p>
                                        <p>Unhealthy</p>
                                        <p>Hazardous</p>
                                    </div>
                                    <div className="measurement">
                                        <div className={aqiColor + " base"} ></div>
                                        <div className={aqiColor + " ball"} style={{left: ballPosition + "%"}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Main;