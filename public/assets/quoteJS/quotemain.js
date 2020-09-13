class Quote {
  constructor() {
    //selectors
    this.MasterContainer = document.getElementById('mastercontainer');
    this.QuoteContainer = document.getElementById('quotetable');
    this.QuoteHeading = document.getElementById('quoteheading');

    this.URL = ``;
    this.selectedForm = '';
    this.areInputsValid = false;

    this.quoteData = {};

    // default values for input values we care about
    // values from number inputs
    this.numApartments = 0;
    this.numFloors = 0;
    this.numBasements = 0;
    this.numElevators = 0;
    this.maxOccupantsPerFloor = 0;
    // values from radio button inputs
    this.percentValue = 0;
    this.ElevatorUnitCost = 0;

    this.addInputEventListener();
    this.addClickEventListener();
  }

  validateInputs() {
    switch (this.selectedForm) {
      case 'Residential':
        if (this.validateResInputs() === true) this.areInputsValid = true;
        console.log('res', this.selectedForm);
        console.log(this.areInputsValid);
        break;

      case 'Commercial':
        if (this.validateComInputs() === true) this.areInputsValid = true;
        console.log('com', this.selectedForm);
        console.log(this.areInputsValid);
        break;

      case 'Corporate':
        if (this.validateChInputs() === true) this.areInputsValid = true;
        console.log('ch', this.selectedForm);
        console.log(this.areInputsValid);
        break;

      case 'Hybrid':
        if (this.validateChInputs() === true) this.areInputsValid = true;
        console.log('ch', this.selectedForm);
        console.log(this.areInputsValid);
        break;
    }
    return this.areInputsValid;
  }

  updateURL() {
    switch (this.selectedForm) {
      case 'Residential':
        this.URL = `/api/quote/residential/${this.numFloors}/${this.numBasements}/${this.numApartments}/${this.ElevatorUnitCost}/${this.percentValue}`;
        console.log(this.URL);
        break;

      case 'Commercial':
        this.URL = `/api/quote/com/${this.numElevators}/${this.ElevatorUnitCost}/${this.percentValue}`;
        console.log(this.URL);
        break;

      case 'Corporate':
        this.URL = `/api/quote/ch/${this.numFloors}/${this.maxOccupantsPerFloor}/${this.ElevatorUnitCost}/${this.percentValue}`;
        console.log(this.URL);
        break;

      case 'Hybrid':
        this.URL = `/api/quote/ch/${this.numFloors}/${this.maxOccupantsPerFloor}/${this.ElevatorUnitCost}/${this.percentValue}`;
        console.log(this.URL);
        break;
    }
  }

  filterElements = () => {
    switch (this.selectedForm) {
      case 'Residential':
        return this.elementMap.filter((element) => element.res === true);

      case 'Commercial':
        return this.elementMap.filter((element) => element.com === true);

      case 'Corporate':
        return this.elementMap.filter((element) => element.corp === true);

      case 'Hybrid':
        return this.elementMap.filter((element) => element.hybrid === true);
    }
  };

  removeFromContainer(div) {
    let firstChild = div.firstElementChild;
    while (firstChild) {
      firstChild.remove();
      firstChild = div.firstElementChild;
    }
  }

  addInputEventListener() {
    this.MasterContainer.addEventListener('input', (e) => {
      e.stopPropagation();
      switch (e.target.id) {
        case 'numApartments':
          e.stopPropagation();
          this.numApartments = e.target.value;
          console.log(this.numApartments);
          this.updateURL();
          break;

        case 'numFloors':
          e.stopPropagation();
          this.numFloors = e.target.value;
          console.log(this.numFloors);
          this.updateURL();
          break;

        case 'numOccupants':
          e.stopPropagation();
          this.maxOccupantsPerFloor = e.target.value;
          console.log(this.maxOccupantsPerFloor);
          this.updateURL();

        case 'numBasements':
          e.stopPropagation();
          this.numBasements = e.target.value;
          console.log(this.numBasements);
          this.updateURL();
          break;

        case 'numElevators':
          e.stopPropagation();
          this.numElevators = e.target.value;
          console.log(this.numElevators);
          this.updateURL();
          break;
      }
    });
  }

  addClickEventListener() {
    this.MasterContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      switch (e.target.id) {
        case 'standard':
          e.stopPropagation();
          if (this.validateInputs()) {
            this.percentValue = 10;
            this.ElevatorUnitCost = 7565;
            this.updateURL();
            this.getQuoteData();
          }
          break;

        case 'premium':
          e.stopPropagation();
          if (this.validateInputs()) {
            this.percentValue = 13;
            this.ElevatorUnitCost = 12345;
            this.updateURL();
            this.getQuoteData();
          }

        case 'excelium':
          e.stopPropagation();
          if (this.validateInputs()) {
            this.percentValue = 16;
            this.ElevatorUnitCost = 15400;
            this.updateURL();
            this.getQuoteData();
          }
      }
    });
  }

  getQuoteData() {
    // if (this.validateFormInputs()) {
    this.quotePromise = fetch(this.URL);
    this.quotePromise
      .then((response) => {
        return response.json();
      })
      .then((quote) => {
        Object.assign(this.quoteData, quote);
        this.renderQuoteTable();
      });
    // }
  }

  formatCurrency = (integer) =>
    integer.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

  resetQuoteValues = () => {
    this.numApartments = 0;
    this.numFloors = 0;
    this.numBasements = 0;
    this.numElevators = 0;
    this.maxOccupantsPerFloor;
    this.percentValue = 0;
    this.ElevatorUnitCost = 0;
  };

  validateResInputs = () => {
    if (
      this.numApartments &&
      this.numFloors &&
      this.numBasements &&
      this.numFloors > this.numBasements
    ) {
      return true;
    } else {
      this.ErrorContainer.style.display = '';
      return false;
    }
  };

  validateComInputs = () => {
    if (this.numElevators > 0) {
      return true;
    } else {
      this.ErrorContainer.style.display = '';
      return false;
    }
  };

  validateChInputs = () => {
    if (this.maxOccupantsPerFloor && this.numFloors) {
      return true;
    } else {
      this.ErrorContainer.style.display = '';
      return false;
    }
  };
}
