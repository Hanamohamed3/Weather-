 let allData = [];
    let userInput = document.querySelector(".input1");

    function getData(type) {
        let myHttp = new XMLHttpRequest();

        myHttp.open("GET", `http://api.weatherapi.com/v1/forecast.json?key=42d49e2ebb74466dbd3184050240201&q=${type}&days=7`);
        myHttp.send();

        myHttp.addEventListener("readystatechange", function () {
            if (myHttp.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(myHttp.response));
                let data = JSON.parse(myHttp.response);
                allData = [data];
                display();
            }
        });
    }





    function display() {
        let cartona = ``;
        for (let i = 0; i < allData.length; i++) {
            const date = new Date(allData[i].location.localtime);
    

            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            const nextDay2 = new Date(nextDay);
            nextDay2.setDate(nextDay.getDate() + 1);


            const options = { weekday: 'long' };
            const formattedDate = date.toLocaleDateString(undefined, options);
            const nextDayName = nextDay.toLocaleDateString(undefined, options);
            const nextDayName2 = nextDay2.toLocaleDateString(undefined, options);

    

            const options2 = {day: 'numeric', month: 'long' };
            const formattedDate2 = date.toLocaleDateString(undefined, options2);



            cartona += `<div class="col-md-4 rounded-start-3 p-0 " style="background-color: #2e3142;">
                <div class="d-flex justify-content-between hi" >
                    <p class="text-white">${formattedDate}</p>

                <p class="text-white pe-2">${formattedDate2}</p>

                </div>
                <div class="mt-5">
                    <p style="color:#CDCDCD"class="fs-2">${allData[i].location.country}</p>
                    <h1 class="text-white mb-3" style="font-size: 80px;">${allData[i].current.temp_c}°C</h1>
                    <img src="images/116.png">
                
                    <p class="text-info">${allData[i].current.condition.text}</p>
                    <div class="icons d-flex justify-content-between mb-3">
                        <span style="color:#CDCDCD"><i class="fa-solid fa-umbrella"></i>${allData[i].current.humidity}%</span>
                        <span style="color:#CDCDCD"><i class="fa-solid fa-wind" ></i>${allData[i].current.wind_kph}km/hr</span>
                        <span style="color:#CDCDCD"><i class="fa-regular fa-compass"></i>${allData[i].current.wind_dir}</span>
                    </div>
                </div>
            </div> 


            <div class="col-md-4 p-0" style="background-color:#262937">
            <div class="text-center hi">
                <p class="text-white pb-3 ">${nextDayName}</p>
            </div>
            <div class=" text-center mt-3">
            <i class="fa-solid fa-cloud-rain fs-3 text-white"></i>
            
            
            <h3 class="text-white">${allData[i].forecast.forecastday[1].day.maxtemp_c}°C</h3>
            <p style="color:#CDCDCD">${allData[i].forecast.forecastday[1].day.mintemp_c}°</p>
            <p class="text-info">${allData[i].forecast.forecastday[1].day.condition.text}</p>
        
            </div>
        </div>
        
        
        <div class="col-md-4 rounded-end-3 p-0" style="background-color: #2e3142;">
                <div class="text-center hi">
                    <p class="text-white pb-3">${nextDayName2}</p>
                </div>
                <div class="text-center">

                <i class="fa-solid fa-snowflake fs-3 text-white"></i>
                    <h3 class="text-white">${allData[i].forecast.forecastday[2].day.maxtemp_c}°C</h3>
                    <p style="color:#CDCDCD">${allData[i].forecast.forecastday[2].day.mintemp_c}°</p>
                    <p class="text-info">${allData[i].forecast.forecastday[2].day.condition.text}</p>
                </div>
            </div>
            </div>
            </div>
    </div>`
        }

        document.querySelector("#myData").innerHTML = cartona;
    }

    document.getElementById('clear').addEventListener('click', function () {
        const location = document.getElementById('floatingInputGroup2').value;
        getData(location);
    });

    userInput.addEventListener("blur",function(e){
        console.log(e.target.value);
        getData(e.target.value);
    });

    
{/* <img src="${allData[i].forecast.forecastday[1].day.condition.icon}" class="fs-3 mb-5" style="color: #ffffff;"></img> 
                <img src="${allData[i].forecast.forecastday[2].day.condition.icon}" class="fs-3 mb-5" style="color: #ffffff;">
*/}