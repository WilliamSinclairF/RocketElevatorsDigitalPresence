class CorporateHybrid extends Quote {
  constructor() {
    super();
    this.maxOccupantsPerFloor = 0;
    this.totalOccupants = 0;
    this.numElevators = 1;
    this.numElevatorPerColumn = 1;
    this.totalElevators = 1;
    this.quoteData = {};
    this.inputEventListeners();
    this.radioButtonEventListener();
  }

  updateURL = () => {
    this.URL = `/api/quote/ch/${this.numFloors}/${this.maxOccupantsPerFloor}/${this.shaftDollarCostToMultiply}/${this.percentValue}`;
  };

  validateInputs = () => {
    if (this.maxOccupantsPerFloor && this.numFloors) {
      return true;
    } else {
      this.$errorcontainer.textContent = this.errorMessage;
      this.clearRadioButtons();
    }
  };

  inputEventListeners = () => {
    document.querySelector('#formcontainer').addEventListener('input', (e) => {
      switch (e.target.id) {
        case 'maxoccupantsperfloor':
          this.maxOccupantsPerFloor = parseInt(
            document.querySelector('#maxoccupantsperfloor').value
          );
          this.updateURL();

        case 'numfloors':
          this.numFloors = parseInt(document.querySelector('#numfloors').value);
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
