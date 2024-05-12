class App {
  constructor() {
    this.typeDriver = document.getElementById("type-driver");
    this.dateInput = document.getElementById("set-date");
    this.timeInput = document.getElementById("set-time");
    this.passengerInput = document.getElementById("set-passenger");
    this.searchButton = document.getElementById("search-cars-btn");
    this.carContainerElement = document.getElementById("row-cars");
  }

  async init() {
    await this.load();

    const validation = () => {
        const typeDriverValue = this.typeDriver.value.trim();
        const dateValue = this.dateInput.value.trim();
        const timeValue = this.timeInput.value.trim();

        if (typeDriverValue && dateValue && timeValue) {
            this.searchButton.removeAttribute("disabled");
        } else {
            this.searchButton.setAttribute("disabled", true);
        }
    };

    this.typeDriver.addEventListener("input", validation);
    this.dateInput.addEventListener("input", validation);
    this.timeInput.addEventListener("input", validation);

    validation();
    this.searchButton.onclick = this.filterer;
}

filterer = () => {
    const driverValue = this.typeDriver.value;
    const dateValue = this.dateInput.value;
    const timeValue = this.timeInput.value;

    const orderDate = new Date(dateValue + "T" + timeValue + ":00.000Z");

    const localData = localStorage.getItem("CARS");
    const newData = JSON.parse(localData);

    const res = newData.filter((car) => car.typeDriver === driverValue && new Date(car.timeInput) < orderDate);

    console.log(newData);
    console.log(res);

    this.clear();
    Car.init(res);
    this.run();
};

async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
}


run = () => {
    Car.list.forEach((car) => {
        const node = document.createElement("div");
        node.className = "col-md-4";
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
    });
};

clear = () => {
    this.carContainerElement.innerHTML = "";
};
}

