/*

/**
 * 
 * @param {*} location 
 *

async function getCurrentWeather(location){
    const url = `http://api.weather.gov/points/${location}`
    try{
        const gridFetch = await fetch(url);
        const gridData = gridFetch.json();

        //return gridData;

        return gridData.properties.gridX;

        /*

        const forecast = await fetch(gridData.properties.forecast);
        const forecastData = await forecast.json();

        return forecastData;
        *

    }catch(error){
        console.error('Error:',error);
    }
}

const location = '38.97355428885113,-104.74660308061661';   // Target in N Colorado Springs
Promise.resolve(getCurrentWeather(location)).then(
    body=>console.log(body)
)

*/

async function getCurrentWeather(prompt,message){
    const url = 'https://api.weather.gov/points/38.97355428885113,-104.74660308061661';         // Target in N Colorado Springs
    try{
        const gridFetch = await fetch(url);
        const gridData = await gridFetch.json();
        const forecastUrl =  gridData.properties.forecastHourly;

        const forecastHourly = await fetch(forecastUrl);
        const forecastData = await forecastHourly.json();
        
        //Return values, period is an hour-long segment
        return [
            forecastData.properties.periods[0],
            forecastData.properties.periods[1],
            forecastData.properties.periods[0].temperature,
            forecastData.properties.periods[1].temperature
        ];
    }catch(error){
        console.error('Error:',error);
    }
}

Promise.resolve(getCurrentWeather()).then(
    body=> console.log(body)
)