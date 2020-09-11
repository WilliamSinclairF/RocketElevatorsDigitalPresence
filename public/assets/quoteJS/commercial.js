class Commercial extends Quote {
  constructor() {
    super();
    this.$numShaftsInput = document.querySelector('#numshafts');
    this.numShafts = 0;
    this.quoteData = {};
    this.inputEventListeners();
    this.radioButtonEventListener();
    this.clearErrorMessage();
    this.resetEstimateBoxStyle();
  }

  updateURL = () => {
    this.URL = `/api/quote/com/${this.numShafts}/${this.shaftDollarCostToMultiply}/${this.percentValue}`;
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
    if (this.numShafts > 0) {
      return true;
    } else {
      this.$errorcontainer.innerHTML = this.errorMessage;
      this.$errorcontainer.classList = 'alert alert-danger m-30 text-center';
      this.clearRadioButtons();
    }
  };

  showQuote = () => {
    this.clearErrorMessage();
    const { installFee, subTotal, total, id } = this.quoteData;

    this.$estimateContainer.classList += ' box-shadow';
    this.$estimateContainer.innerHTML = '';
    this.$estimateContainer.innerHTML = `
        ${this.heading}
        <table class="table"> <tbody> 

        <tr> 
        <th scope="row">Quote ID:</th> <td>${id}</td> </tr>

        <tr> 
        <th scope="row">Elevators needed:</th> <td>${this.numShafts}</td> </tr>

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
