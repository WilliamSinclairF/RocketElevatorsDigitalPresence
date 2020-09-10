class Quote {
  constructor() {
    //selectors - number inputs
    this.$pricetable = document.querySelector('#rbcontainer');
    this.$estimateContainer = document.querySelector('#estimatecontainer');
    this.$errorcontainer = document.querySelector('#errorcontainer');
    //selectors - radio buttons
    this.$standardRadioButton = document.querySelector('#standard');
    this.$premiumRadioButton = document.querySelector('#premium');
    this.$exceliumRadioButton = document.querySelector('#excelium');

    // dynamic html
    this.errorMessage = `Please fill all required fields before selecting a product line.`;
    this.contactButton = `<a href="#contactres"><h3 class="btn btn-primary btn-lg">Contact Sales</h3></a>`;
    this.heading = `<h4 class="mt-20 text-blue">Our Quote</h4>`;

    this.URL = ``;

    this.numApartments = 0;
    this.numFloors = 0;
    this.numBasements = 0;

    this.percentValue = 0;
    this.numColumns = 1;
    this.doorsPerFloorAvg = 0;
    this.totalShafts = 0;
    this.shaftDollarCostToMultiply = 0;
  }

  getQuoteData() {
    if (this.validateInputs()) {
      this.quotePromise = fetch(this.URL);
      this.quotePromise
        .then((response) => {
          return response.json();
        })
        .then((quote) => {
          Object.assign(this.quoteData, quote);
          this.showQuote();
        });
    }
  }

  inputValidation = () => {
    document.querySelectorAll('.numberinput').forEach((element) =>
      element.addEventListener('input', () => {
        const value = element.value;

        if (!value) {
          element.dataset.state = '';
          return;
        }

        const trimmed = value.trim();

        if (trimmed) {
          element.dataset.state = 'valid';
        } else {
          element.dataset.state = 'invalid';
        }
      })
    );
  };
  clearEstimate = () => {
    this.$estimateContainer.innerHTML = '';
  };

  clearErrorMessage = () => {
    this.$errorcontainer.textContent = ``;
  };
  clearRadioButtons = () => {
    document
      .getElementsByName('productline')
      .forEach((el) => (el.checked = false));
    return;
  };
}
