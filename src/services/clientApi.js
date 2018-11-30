export default class clientApi {
	_apiBase = 'https://cors-anywhere.herokuapp.com/https://api.rasp.yandex.net/v3.0/schedule/?apikey=4947ef3f-adeb-4221-93ec-743762d9d209&';
	_nextID = 1001;

	getResourse = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}` +
			`, Received status: ${res.status}`);
		}
		return await res.json();
	};

	getArrivals = async () => {
		const res = await this.getResourse(`station=s9600213&transport_types=plane&event=arrival`);
		return this._transformFlights(res);
	};

	getDepartures = async () => {
		const res = await this.getResourse(`station=s9600213&transport_types=plane&event=departure`);
		return this._transformFlights(res);
	};

	getAllFlights = async () => {
		const arrivals = await this.getArrivals();
		const departures = await this.getDepartures();
		const result = arrivals.concat(departures);
		return result;
	};

	_transformFlights = (apiData) => {
		const event = apiData.event === 'arrival' ? 'Прибытие' : 'Отправление';
		const coll = apiData.schedule.slice();

		const newArray = coll.map((item) => {
			const { arrival, departure, days,
					thread: { title: direction, number: flight, vehicle,
						carrier: { title: carrier } } } = item;

			const time = arrival ? arrival : departure;
			const id = this._nextID += 1;
			const dayz = 'Расписание: ' + days.length > 150 ? days.slice(0, 59 - 3) + '...' : days;

			return { id, event, time, direction, flight, carrier, vehicle,
				days: dayz }
		});
		return newArray;
	}
};


