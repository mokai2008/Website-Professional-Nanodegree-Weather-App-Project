// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f8525f1067c22f4d67db5c12a92dc983';

/* Function called by event listener */
const generateFunc = () => {
  const zip = document.getElementById('zip').value;
  const country = document.getElementById('country').value;
  const feelings = document.getElementById('feelings').value;
  let d = new Date();
  let date = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

  getDataFromApi(baseUrl, zip, country, apiKey).then(temp => {
    const data = {
      temperature: temp,
      date: date,
      user_response: feelings
    };

    postData('/postdata', data).then(ShowData());
  });

};

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateFunc);


/* Function to GET Web API Data*/

const getDataFromApi = async(url, zip, country, key) => {
  const data = await fetch(`${url}${zip},${country}${key}`);

  try {
    const allData = await data.json();
    // return the temperature value
    return allData.main["temp"];
  }catch(error) {
    console.log("error", error);
  }
}

/* Function to POST data */

const postData = async(url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)

  });

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log("error", error);
  }
}

/* Function to GET Project Data */
const ShowData = async() => {
  const data = await fetch('/getdata');

  try {
  const allData = await data.json();
  document.getElementById('date').innerHTML = `Date: ${allData.date}`;
  document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
  document.getElementById('content').innerHTML = `Content: ${allData.user_response}`;
  }catch(error) {
    console.log("error", error);
  }
}
