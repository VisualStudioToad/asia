var isdark = 0;

function updateSpotify() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.spotify.com/v1/me/player/currently-playing");
    xhr.setRequestHeader("Authorization", "Bearer APIKEY");
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        var song = new Array();
        song = JSON.parse(xhr.responseText);
        $("#songname").text(song.item.name);
        $("#artistname").text(song.item.album.artists[0].name);
        $("#cover").attr('src', song.item.album.images[2].url);
        $("#songlink").attr('href', song.item.external_urls.spotify);
    }};
    xhr.send();
}

function changeTheme(){
    
    if(isdark == 0) {
        $('body').css('background-color', '#fff').css('color', '#000');
        $("svg").css({"filter": "invert(1)"});
        $("#songname").css({"color": "black"});
        $("#artistname").css({"color": "black"});
        $("#bar1").css({"background": "black"});
        $("#bar2").css({"background": "black"});
        $("#bar3").css({"background": "black"});
        isdark = 1;
    }
    else {
        $('body').css('background-color', '#000').css('color', '#fff');
        $("svg").css({"filter": "invert(0)"});
        $("#songname").css({"color": "white"});
        $("#artistname").css({"color": "white"});
        $("#bar1").css({"background": "white"});
        $("#bar2").css({"background": "white"});
        $("#bar3").css({"background": "white"});
        isdark = 0;
    }
}
  
function clockUpdate() {
    var date = new Date();
    function addZero(x) {
      if (x < 10) {
        return x = '0' + x;
      } else {
        return x;
      }
    }
  
    function twelveHour(x) {
      if (x > 12) {
        return x = x - 12;
      } else if (x == 0) {
        return x = 12;
      } else {
        return x;
      }
    }
  
    var h = addZero(twelveHour(date.getHours()));
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    $("#current-time").text(`${mm}/${dd}/${yyyy} • ${h}:${m}:${s}`)
}

function meteoUpdate(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=Paris,fr&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var meteo = new Array();
            meteo = JSON.parse(xhr.responseText);
            // console.log(meteo);
            if(meteo.weather[0].main == "Clear")
              var emoji = "🌤️";
            if(meteo.weather[0].main == "Clouds")
              var emoji = "☁️";
            if(meteo.weather[0].main == "Mist" || meteo.weather[0].main == "Fog")
              var emoji = "🌫️";
            if(meteo.weather[0].main == "Rain" || meteo.weather[0].main == "Drizzle")
              var emoji = "🌧️";
            if(meteo.weather[0].main == "Snow")
              var emoji = "❄️";
            if(meteo.weather[0].main == "Extreme")
              var emoji = "🌪️";
            if(meteo.weather[0].main == "Wind")
              var emoji = "🌬️";

            $("#current-weather").text(`It's currently ${emoji} ${Math.round(meteo.main.temp)}°C (${meteo.weather[0].main}) in Paris.`)
    }};

xhr.send();
}

window.onload = function () {
    clockUpdate();
    setInterval(clockUpdate, 1000);
}

meteoUpdate();
updateSpotify();
