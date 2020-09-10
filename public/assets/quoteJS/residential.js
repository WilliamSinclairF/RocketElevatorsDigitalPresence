class Residential extends Quote {
  constructor() {
    super();
    this.quoteData = {};
    this.inputEventListeners();
    this.radioButtonEventListener();
  }

  updateURL = () => {
    this.URL = `/api/quote/residential/${this.numFloors}/${this.numBasements}/${this.numApartments}/${this.shaftDollarCostToMultiply}/${this.percentValue}`;
  };

  inputEventListeners = () => {
    document.querySelector('#formcontainer').addEventListener('input', (e) => {
      switch (e.target.id) {
        case 'numapartments':
          this.numApartments = parseInt(
            document.querySelector('#numapartments').value
          );
          this.updateURL();

        case 'numfloors':
          this.numFloors = parseInt(document.querySelector('#numfloors').value);
          this.updateURL();

        case 'numbasements':
          this.numBasements = parseInt(
            document.querySelector('#numbasements').value
          );
          this.updateURL();
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
              break;

            case 12345:
              this.percentValue = 13;
              this.updateURL();
              this.getQuoteData();
              break;

            case 15400:
              this.percentValue = 16;
              this.updateURL();
              this.getQuoteData();
              break;
          }
        });
      });
  };

  validateInputs = () => {
    if (this.numApartments && this.numFloors) {
      return true;
    } else {
      this.$errorcontainer.textContent = this.errorMessage;
      this.clearRadioButtons();
    }
  };

  showQuote = () => {
    this.clearErrorMessage();
    const {
      totalShafts,
      totalColumns,
      installFee,
      subTotal,
      total,
    } = this.quoteData;

    this.$estimateContainer.classList += 'pt-20 container card box-shadow';
    this.$estimateContainer.innerHTML = '';
    this.$estimateContainer.innerHTML = `
        ${this.heading}
        <ul>
        <li> Elevators needed: ${totalShafts} </li>
        <li> Columns needed: ${totalColumns} </li>
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
