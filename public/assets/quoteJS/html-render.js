class RenderHTML extends Quote {
  constructor() {
    super();

    this.NumberInputHeading = document.getElementById('numberinputheading');
    this.RadioButtonHeading = document.getElementById('radiobuttonheading');
    this.ErrorContainer = document.getElementById('errorcontainer');

    this.numberInputForm = document.getElementById('numberinputform');
    this.radioButtonForm = document.getElementById('radiobuttoninputform');
    this.quoteTable = document.getElementById('quotetable');

    this.$quoteIdTD = document.getElementById('quote-id');
    this.$quoteElevatorsTD = document.getElementById('quote-elevators');
    this.$quoteColumnsTD = document.getElementById('quote-columns');
    this.$quoteInstallfeeTD = document.getElementById('quote-installfee');
    this.$quoteSubtotalTD = document.getElementById('quote-subtotal');
    this.$quoteTotalTD = document.getElementById('quote-total');

    this.RadioButtonMap = [
      {
        Label: 'Standard - $7565 Per Elevator',
        inputType: 'radio',
        id: 'standard',
        class: 'fw-300',
        small1text: 'Our time-tested elevators.',
        small2text: '10% installation fee.',
        small1class: 'form-text text-muted bold',
        small2class: 'form-text text-muted text-gray',
        name: 'productline',
      },
      {
        Label: 'Premium - $12345 Per Elevator',
        inputType: 'radio',
        id: 'premium',
        class: 'fw-300',
        small1text: 'Our luxury line of elevators.',
        small2text: '13% installation fee.',
        small1class: 'form-text text-muted bold',
        small2class: 'form-text text-muted text-gray',
        name: 'productline',
      },
      {
        Label: 'Excelium - $15400 Per Elevator',
        inputType: 'radio',
        id: 'excelium',
        class: 'fw-300',
        small1text:
          'Our exclusive line of elevators, made to order by our in-house Elevator Artist with premium materials.',
        small2text: '16% installation fee.',
        small1class: 'form-text text-muted bold',
        small2class: 'form-text text-muted text-gray',
        name: 'productline',
      },
    ];

    this.elementMap = [
      {
        Label: 'Number Of Apartments:',
        inputType: 'number',
        id: 'numApartments',
        min: 0,
        res: true,
      },

      {
        Label: 'Number Of Floors:',
        inputType: 'number',
        id: 'numFloors',
        min: 0,
        corp: true,
        com: true,
        hybrid: true,
      },

      {
        Label: 'Number Of Floors (Including Basements):',
        inputType: 'number',
        id: 'numFloors',
        min: 0,
        res: true,
      },

      {
        Label: 'Number Of Basements:',
        inputType: 'number',
        id: 'numBasements',
        min: 0,
        res: true,
        corp: true,
        com: true,
        hybrid: true,
      },

      {
        Label: 'Number Of Distinct Businesses:',
        inputType: 'number',
        id: 'numBusinesses',
        min: 0,
        com: true,
        hybrid: true,
      },

      {
        Label: 'Number Of Available Parking Spaces:',
        inputType: 'number',
        id: 'numParking',
        min: 0,
        com: true,
        corp: true,
        hybrid: true,
      },

      {
        Label: 'Number Of Required Elevators:',
        inputType: 'number',
        id: 'numElevators',
        min: 0,
        max: 24,
        com: true,
      },

      {
        Label: 'Number Of Tenant Companies:',
        inputType: 'number',
        id: 'numCompanies',
        min: 0,
        corp: true,
      },

      {
        Label: 'Maximum Number Of Occupants Per Floor:',
        inputType: 'number',
        id: 'numOccupants',
        min: 0,
        corp: true,
        hybrid: true,
      },

      {
        Label: 'Hours Of Activity',
        inputType: 'number',
        id: 'numHours',
        min: 0,
        max: 24,
        hybrid: true,
      },
    ];

    this.$selectionContainer = document.querySelector('#selectioncontainer');

    this.MasterContainer = document.getElementById('mastercontainer');
    this.numberInputForm = document.getElementById('numberinputform');
    this.radioButtonForm = document.getElementById('radiobuttoninputform');
    this.quoteTable = document.getElementById('quotetable');

    this.renderBasedOnDropdown();
  }

  appendInputsToDOM = (objectArray, form) => {
    objectArray.forEach((el) => {
      let div = document.createElement('div');
      let label = document.createElement('label');
      let input = document.createElement('input');
      let small1 = document.createElement('small');
      let small2 = document.createElement('small');
      let br = document.createElement('br');

      form.appendChild(div);
      label.textContent = el.Label;
      label.className = 'fw-300';
      input.type = el.inputType;
      input.id = el.id;
      input.min = el.min;
      small1.textContent = el.small1text;
      small2.textContent = el.small2text;
      small1.className = el.small1class;
      small2.className = el.small2class;

      if (el.name) {
        input.name = 'productline';
      }

      if (el.small1text && el.small2text) {
        div.append(label, input, br, small1, br, small2, br);
      } else {
        div.append(label, input, br);
      }
      div.parentNode.insertBefore(br, div.nextSibling);
    });
    this.NumberInputHeading.textContent = `Tell Us About Your ${this.selectedForm} Project`;
    this.RadioButtonHeading.textContent = 'Select Your Solution';
    this.QuoteContainer.style.display = '';
    this.QuoteHeading.style.display = '';
  };

  newQuoteForm = (value) => {
    this.resetQuoteRender();
    this.selectedForm = value;
    this.removeFromContainer(this.numberInputForm);
    this.removeFromContainer(this.radioButtonForm);

    this.appendInputsToDOM(
      this.filterElements(),
      this.numberInputForm,
      this.NumberInputHeading,
      this.ProjectHeading
    );

    this.appendInputsToDOM(
      this.RadioButtonMap,
      this.radioButtonForm,
      this.RadioButtonHeading,
      'Select Your Solution'
    );
  };

  renderQuoteTable = () => {
    const {
      totalShafts,
      totalColumns,
      installFee,
      subTotal,
      total,
      id,
    } = this.quoteData;

    this.$quoteIdTD.textContent = id;
    this.$quoteElevatorsTD.textContent = totalShafts;
    if (this.selectedForm != 'Commercial') {
      this.$quoteColumnsTD.textContent = totalColumns;
    } else {
      this.$quoteColumnsTD.textContent = 'N/A';
    }
    this.$quoteInstallfeeTD.textContent = this.formatCurrency(installFee);
    this.$quoteSubtotalTD.textContent = this.formatCurrency(subTotal);
    this.$quoteTotalTD.textContent = this.formatCurrency(total);
  };

  resetQuoteRender = () => {
    this.$quoteIdTD.textContent = '...';
    this.$quoteColumnsTD.textContent = '...';
    this.$quoteElevatorsTD.textContent = '...';
    this.$quoteInstallfeeTD.textContent = '...';
    this.$quoteSubtotalTD.textContent = '...';
    this.$quoteTotalTD.textContent = '...';
  };

  renderBasedOnDropdown = () => {
    this.$selectionContainer.addEventListener('change', (e) => {
      let selectedFormValue = e.target.value;
      switch (e.target.value) {
        case 'Residential':
          this.newQuoteForm(selectedFormValue);
          this.resetQuoteValues();
          this.areInputsValid = false;
          this.ErrorContainer.style.display = 'none';
          break;

        case 'Commercial':
          this.newQuoteForm(selectedFormValue);
          this.resetQuoteValues();
          this.areInputsValid = false;
          this.ErrorContainer.style.display = 'none';
          break;

        case 'Corporate':
          this.selectedForm = 'Corporate';
          this.newQuoteForm(selectedFormValue);
          this.resetQuoteValues();
          this.areInputsValid = false;
          this.ErrorContainer.style.display = 'none';
          break;

        case 'Hybrid':
          this.selectedForm = 'Hybrid';
          this.newQuoteForm(selectedFormValue);
          this.resetQuoteValues();
          this.areInputsValid = false;
          this.ErrorContainer.style.display = 'none';
          break;
      }
    });
  };
}

const Render = new RenderHTML();
