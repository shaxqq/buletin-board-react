import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";

export const Weather = () => {
  const [weather, setWeather] = useState({});
//  const [clock, setClock] = useState(new Date());

//const Time = useEffect(() => {
//   const time = setInterval(() => setClock(new Date()), 1000);
//   return () => {
//     clearInterval(time);
//   };
// }, []);
// <Typography style={{ paddingRight: "24px" }} variant="button" color='primary'>
// {clock.toLocaleTimeString()}
// </Typography>
// console.log(Time)


 const Wether = useEffect(() => {
     fetch(
       "https://api.openweathermap.org/data/2.5/weather?q=kyiv&lang=ru&units=metric&appid=d9f34115fe991c7986c7637f776adc28"
     )
       .then((res) => {
         if (res.ok) {
           res.json().then((data) => {return setWeather(data)});
         }
       })
       .catch((err) => console.log(err));
   }, []);
  // console.log(weather)
//console.log(Wether)

  //   const weatherIconn = ()=>{
  //     if (weather){
  //       return <SvgIcon component={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
  //     }
  //   }
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {typeof weather.main !== "undefined" ? (
        <div>
          <Container id={weather.id}>
            <Typography color="secondary" variant="overline">
              {weather.name} {`${Math.round(weather.main.temp)}°C`}{" "}
              {weather.weather[0].description}
            </Typography>
          </Container>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
