let form = document.getElementById("form1")
// let address = document.getElementById("address").value;
const locationforecast = document.getElementById("location");
const forecast_f = document.getElementById("forecast");
const error = document.getElementById("error");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(input_address.value)

    weatherfuc()
    form.reset()
})
let weatherfuc = async () => {
    try {
        const address = document.getElementById('address').value

        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        console.log(data)

        if (data.error) {
            error.innerHTML = data.error
            forecast_f.innerText = ''
            locationforecast.innerText = ''

        }


        else {
            setTimeout(() => {
                locationforecast.innerHTML = data.location

            }, 500)

            setTimeout(() => {
                forecast_f.innerHTML = data.forecast

            }, 1000)

            error.innerText = ''
        }

    }
    catch (err) {
        console.log(err)
    }
}