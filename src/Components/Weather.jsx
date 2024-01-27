import React from 'react'
import './Style.css'
import moment from 'moment'
import {Button} from 'semantic-ui-react'

function Weather({ weatherData }) {
    const refresh = () => {
        window.location.reload();
      };
  return (
    <div className="root">
      <div className="main">
        <div className="top">
          <p className="header">{weatherData?.name}</p>
          <Button
            className="button"
            inverted
            color="blue"
            circular
            icon="refresh"
            onClick={refresh}
          />
        </div>
        <div className="flex">
          <p className="day">
            {moment().format("dddd")}, <span>{moment().format("LL")}</span>
          </p>
          <p className="description">{weatherData?.weather[0].main}</p>
        </div>

        <div className="flex">
          <p className="temp">Temprature: {weatherData?.main?.temp} &deg;C</p>
          <p className="temp">Humidity: {weatherData?.main?.humidity} %</p>
        </div>

        <div className="flex">
          <p className="sunrise-sunset">
            Sunrise:{" "}
            {new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString(
              "en-IN"
            )}
          </p>
          <p className="sunrise-sunset">
            Sunset:{" "}
            {new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString(
              "en-IN"
            )}
          </p>
        </div>
        {/* <SpeechSynthesisComponent
  textToSpeak={`The weather data is as follows: Date is ${new Date(
    weatherData?.sys?.sunset * 1000
  ).toLocaleTimeString('en-IN')}, Temperature is ${weatherData?.main?.temp}, Humidity is ${weatherData?.main?.humidity}`}
/> */}

      </div>  
    </div>
  )
}

export default Weather