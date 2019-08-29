window.addEventListener('load', () => {
	let locationTimezone = document.querySelector('.location-timezone');
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.degree');

	const temperatureSection = document.querySelector('.temperature-section');
	const temperatureSpan = document.querySelector('.temperature-section span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/e941f6dbda4f87fac676da0332dd426b/${long},${lat}`;

			fetch(api)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					const { temperature, summary, icon } = data.currently;
					//SET DOM Elements drom the API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					//Formula for calculete Celcius
					let celsius = (temperature - 32) * (5 / 9);
					//Set the Icon
					setIcons(icon, document.querySelector('.icon'));

					//Change temperature to Celsius/ Farenheit
					temperatureSection.addEventListener('click', () => {
						if (temperatureSpan.textContent === 'C') {
							temperatureSpan.textContent = 'F';
							temperatureDegree.textContent = temperature;
						} else {
							temperatureSpan.textContent = 'C';
							temperatureDegree.textContent = Math.floor(celsius);
						}
					});
				});
		});
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: 'white' });
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});
