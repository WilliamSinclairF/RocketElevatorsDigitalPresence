class Commercial extends Quote {
  constructor() {
    super();
    this.$numShaftsInput = document.querySelector('#numshafts');
    this.numShafts = 0;
    this.quoteData = {};
    this.inputEventListeners();
    this.radioButtonEventListener();
    this.URL = ``;
  }

  updateURL = () => {
    this.URL = `/api/quote/com/${this.numShafts}/${this.shaftDollarCostToMultiply}/${this.percentValue}`;
    console.log(this.URL);
  };

  inputEventListeners = () => {
    document.querySelector('#formcontainer').addEventListener('input', (e) => {
      if (e.target.id === 'numshafts') {
        this.numShafts = parseInt(e.target.value);
      }
    });
  };

  radioButtonEventListener = () => {
    document
      .querySelectorAll('input[name="productline"]')
      .forEach((radioButton) => {
        radioButton.addEventListener('change', (e) => {
          this.shaftDollarCostToMultiply = parseInt(e.target.value);
          switch (this.shaftDollarCostToMultiply) {
            case 7565:
              this.percentValue = 10;
              this.updateURL();
              this.getQuoteData();
              console.log(this.quoteData);
              break;

            case 12345:
              this.percentValue = 13;
              this.updateURL();
              this.getQuoteData();
              console.log(this.quoteData);

              break;

            case 15400:
              this.percentValue = 16;
              this.updateURL();
              this.getQuoteData();
              console.log(this.quoteData);

              break;

            default:
              console.log('all good in the hood');
          }
        });
      });
  };

  getQuoteData() {
    if (this.validateInputs()) {
      this.quotePromise = fetch(this.URL);
      this.quotePromise
        .then((response) => {
          return response.json();
        })
        .then((quote) => {
          Object.assign(this.quoteData, quote);
          console.log(this.quoteData);
          this.showQuote();
        });
    }
  }

  validateInputs = () => {
    if (this.numShafts > 0) {
      return true;
    } else {
      this.$errorcontainer.textContent = this.errorMessage;
      document
        .getElementsByName('productline')
        .forEach((el) => (el.checked = false));
    }
  };

  showQuote = () => {
    this.clearErrorMessage();
    const { installFee, subTotal, total } = this.quoteData;

    this.$estimateContainer.classList += 'pt-20 container card box-shadow';
    this.$estimateContainer.innerHTML = '';
    this.$estimateContainer.innerHTML = `
        ${this.heading}
        <ul>
        <li> Elevators needed: ${this.numShafts} </li>
        <li> Install fee: ${installFee.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })} </li>

        <li> Subtotal: ${subTotal.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })} 
        </li>

        <li> Total: ${total.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })} 
        </li>
        </ul>
        <br />
        ${this.contactButton}`;
  };
}
