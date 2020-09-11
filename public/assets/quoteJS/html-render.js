class RenderHTML extends Quote {
  constructor() {
    super();
    this.$selectionContainer = document.querySelector('#selectioncontainer');
    this.$formContainer = document.querySelector('#formcontainer');

    this.mainHeading = `<h4 class="mt-20 text-blue">Tell Us About Your Project</h4>`;
    this.selectionHeading = `<h4 class="mt-20 text-blue">Select Your Solution</h4>`;
    this.placeHolderQuote = `<h4 class="mt-20 text-blue text-center">Your Quote...</h4>`;

    this.radioButtonsHtml = `
       ${this.selectionHeading}
    <p id="errorcontainer" class="text-red col-xs-6"></p>
    <form>
      <label for="standard" class="fw-300"> Standard - $7565 per elevator
      <input name="productline" type="radio" id="standard" value="7565"/>
      </label> 
      <small class="form-text text-muted bold">Our time-tested elevators. </small>
      <small class="form-text text-muted text-gray">10% installation fee.</small>
      <br />
      <label for="premium" class="fw-300"> Premium - $12,345 per elevator
      <input name="productline" type="radio" id="premium" value="12345" />
      </label> 
      <small class="form-text text-muted bold">Our luxury line of elevators. </small>
      <small class="form-text text-muted text-gray">13% installation fee.</small>

      <br />
      <label for="excelium" class="fw-300">Excelium - $15,400 per elevator
      <input name="productline" type="radio" id="excelium" value="15400" />
      </label> 
      <small class="form-text text-muted bold">Our exclusive line of elevators, made to order by our <br /> in-house Elevator Artist with premium materials.</small>
      <small class="form-text text-muted text-gray">16% installation fee.</small>
      <br />
      </form>`;

    this.floorInputHtml = `
      <div> 
        <label for="numfloors" class="fw-300"> Number Of Floors (including basements) <strong>*</strong> </label>
        <input name="numfloors" type="number" id="numfloors" class="numberinput" min="0" /> <br />
      </div>`;
    this.basementInputHtml = `
      <div>
        <label for="numbasements" class="fw-300">Number Of Basements <strong>*</strong> </label>
        <input name="numbasements" type="number" id="numbasements"  class="numberinput" min="0" />
      </div>`;
    this.renderBasedOnDropdown();
  }

  // conditional rendering

  renderResidentialForm = () => {
    this.$formContainer.innerHTML = '';
    this.$formContainer.innerHTML = `
  ${this.mainHeading}
  <br />
  <form>
      <div> 
        <label for="numapartments" class="fw-300">Number Of Apartments <strong>*</strong> </label>
        <input name="numapartments" type="number" id="numapartments" class="numberinput" min="0" />
        <br />
      </div>
      ${this.floorInputHtml}
      ${this.basementInputHtml}
      </form>
    `;
    this.$pricetable.innerHTML = '';
    this.$pricetable.innerHTML = `${this.radioButtonsHtml}`;
    this.$estimateContainer.innerHTML = this.placeHolderQuote;
  };

  renderCommercialForm = () => {
    this.$formContainer.innerHTML = '';
    this.$formContainer.innerHTML = `
    ${this.mainHeading}
    <br />
    <form>
      <div>
        <label for="numdistinctbusinesses" class="fw-300">Number Of Distinct Businesses</label>
        <input
          name="numdistinctbusinesses"
          type="number"
          id="numdistinctbusinesses"
           class="numberinput" 
           min="0"
        />
        <br />
      </div>
     ${this.floorInputHtml}
     ${this.basementInputHtml}
      <div>
        <label for="numparkingspaces" class="fw-300">Number Of Parking Spaces</label>
        <input name="numparkingspaces" type="number" id="numparkingspaces" class="numberinput" min="0"/>
      </div>
      <div>
        <label for="numshafts" class="fw-300">Required Elevator Quantity  <strong>*</strong></label>
        <input name="numshafts" type="number" id="numshafts" class="numberinput" min="0" />
      </div>
    </div>
    </form>
  </div>
    <br />`;
    this.$pricetable.innerHTML = '';
    this.$pricetable.innerHTML = `${this.radioButtonsHtml}`;
    this.$estimateContainer.innerHTML = this.placeHolderQuote;
  };

  renderCorpForm = () => {
    this.$formContainer.innerHTML = '';
    this.$formContainer.innerHTML = `
    ${this.mainHeading}
    <br />
    <form>
      <div>
        <label for="numtenantcompanies" class="fw-300">Number Of Tenant Companies</label>
        <input name="numtenantcompanies" type="number" id="numtenantcompanies" class="numberinput" min="0" /> <br />
      </div>
      ${this.floorInputHtml}
      ${this.basementInputHtml}

      <div>
        <label for="numparkingspaces" class="fw-300">Number Of Parking Spaces</label>
        <input name="numparkingspaces" type="number" id="numparkingspaces"  class="numberinput" min="0" />
      </div>
      <div> <label for="maxoccupantsperfloor" class="fw-300">Maximum Number Of Occupants Per Floor  <strong>*</strong> </label>
        <input name="maxoccupantsperfloor" type="number" id="maxoccupantsperfloor" class="numberinput" min="0" /> 
     </div>
    </div>
    </form>
  </div> <br />`;
    this.$pricetable.innerHTML = '';
    this.$pricetable.innerHTML = `${this.radioButtonsHtml}`;
    this.$estimateContainer.innerHTML = this.placeHolderQuote;
  };

  renderHybridForm = () => {
    this.$formContainer.innerHTML = '';
    this.$formContainer.innerHTML = `
    ${this.mainHeading}
    <br />
    <form>
      <div> <label for="numtenantcompanies" class="fw-300">Number Of Tenant Companies </label>
        <input name="numtenantcompanies" type="number" id="numtenantcompanies" class="numberinput" min="0" /> <br />
      </div>
      ${this.floorInputHtml}
      ${this.basementInputHtml}
      <div>
        <label for="numparkingspaces" class="fw-300">Number Of Parking Spaces</label>
        <input name="numparkingspaces" type="number" id="numparkingspaces"  class="numberinput" min="0"/>
      </div>
      <div> 
      <label for="maxoccupantsperfloor" class="fw-300">Maximum Number Of Occupants Per Floor <strong>*</strong> </label>
      <input name="maxoccupantsperfloor" type="number" id="maxoccupantsperfloor" class="numberinput" min="0"/>
      </div>
       <div> 
       <label for="hoursofoperation" class="fw-300"> Hours of Operation </label>
        <input name="hoursofoperation" type="number" id="hoursofoperation" class="numberinput" max="24" min="0" />
      </div>
    </form>
    <br />`;
    this.$pricetable.innerHTML = '';
    this.$pricetable.innerHTML = `${this.radioButtonsHtml}`;
    this.$estimateContainer.innerHTML = this.placeHolderQuote;
  };

  // set event listeners on dropdown

  renderBasedOnDropdown = () => {
    this.$selectionContainer.addEventListener('change', (e) => {
      switch (e.target.value) {
        case 'residential':
          this.renderResidentialForm();
          new Residential();
          break;

        case 'commercial':
          this.renderCommercialForm();
          new Commercial();
          break;

        case 'corporate':
          this.renderCorpForm();
          new CorporateHybrid();
          break;

        case 'hybrid':
          this.renderHybridForm();
          new CorporateHybrid();
          break;
      }
    });
  };
}

new RenderHTML();
