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
    this.clearErrorMessage();
    this.resetEstimateBoxStyle();
  }

  updateURL = () => {
    this.URL = `/api/quote/ch/${this.numFloors}/${this.maxOccupantsPerFloor}/${this.shaftDollarCostToMultiply}/${this.percentValue}`;
  };

  validateInputs = () => {
    if (this.maxOccupantsPerFloor && this.numFloors) {
      return true;
    } else {
      this.$errorcontainer.innerHTML = this.errorMessage;
      this.$errorcontainer.classList = 'alert alert-danger m-30 text-center';
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
      id,
    } = this.quoteData;

    this.$estimateContainer.classList += ' box-shadow';
    this.$estimateContainer.innerHTML = '';
    this.$estimateContainer.innerHTML = `
        ${this.heading}
        <table class="table"> <tbody> 

        <tr> 
        <th scope="row">Quote ID:</th> <td>${id}</td> </tr>

        <tr> 
        <th scope="row">Elevators needed:</th> <td>${totalShafts}</td> </tr>
        
        <tr> 
        <th scope="row">Columns needed: </th>
        <td>${totalColumns} 
        </td> 
        </tr>

        <tr>
        <th scope="row"> Install fee: </th>
         <td>${installFee.toLocaleString('en-US', {
           style: 'currency',
           currency: 'USD',
         })} 
        </td> 
        </tr>

        <tr> <th scope="row"> Subtotal: </th>
        <td> ${subTotal.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })} 
        </td> 
        </tr>

        <tr> <th scope="row"> Total: </th>
        <td>
         ${total.toLocaleString('en-US', {
           style: 'currency',
           currency: 'USD',
         })} 
        </td>
        </tr>
        </tbody>
        </table
        <br />
        ${this.contactButton}`;
  };
}
