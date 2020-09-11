class Residential extends Quote {
  constructor() {
    super();
    this.quoteData = {};
    this.inputEventListeners();
    this.radioButtonEventListener();
    this.clearErrorMessage();
    this.resetEstimateBoxStyle();
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
    if (
      this.numApartments &&
      this.numFloors &&
      this.numBasements &&
      this.numFloors != this.numBasements
    ) {
      return true;
    } else {
      this.$errorcontainer.innerHTML = this.errorMessage;
      this.$errorcontainer.classList = 'alert alert-danger text-center';
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
      id,
    } = this.quoteData;

    console.log(this.quoteData);

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
