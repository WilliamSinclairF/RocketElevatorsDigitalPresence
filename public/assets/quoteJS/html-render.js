class RenderHTML extends Quote {
  constructor() {
    super();
    this.$selectionContainer = document.querySelector('#selectioncontainer');
    this.$formContainer = document.querySelector('#formcontainer');
    this.renderBasedOnDropdown();

    this.radioButtonsHtml = `
   <div id="pricetable" class="order 98 m-30 ml-10 w-100p">
       <h4>Select Your Solution</h4> 
       <br />
    <div class="ml-auto mr-auto">
    <form>
      <label for="standard"> Standard - $7565 per elevator
      <input name="productline" type="radio" id="standard" value="7565" />
      </label> 
      <small class="form-text text-muted">Our time-tested elevators. </small>
      <br />
      <label for="premium"> Premium - $12,345 per elevator
      <input name="productline" type="radio" id="premium" value="12345" />
      </label> 
      <small class="form-text text-muted">Our luxury line of elevators. </small>

      <br />
      <label for="excelium">Excelium - $15,400 per elevator
      <input name="productline" type="radio" id="excelium" value="15400" />
      </label> 
      <small class="form-text text-muted">Our exclusive line of elevators, made to order. </small>
      <br />
      </form>
      </div>
    </div>`;

    this.floorInputHtml = `
      <div> 
        <label for="numfloors"> Number Of Floors (including basements) <strong>*</strong> </label>
        <input name="numfloors" type="number" id="numfloors" class="numberinput" min="0" /> <br />
      </div>`;
    this.basementInputHtml = `
      <div>
        <label for="numbasements">Number Of Basements <strong>*</strong> </label>
        <input name="numbasements" type="number" id="numbasements"  class="numberinput" min="0" />
      </div>`;
  }

  // conditional rendering}

  renderResidentialForm = () => {
    this.$formContainer.innerHTML = '';
    this.$formContainer.innerHTML = `<div id="residentialform" class="m-30 mr-10 w-100p">
  <h4>Tell Us About Your Project</h4>
  <br />
  <div class="ml-auto mr-auto">
  <form>
      <div>
        <label for="numapartments">Number Of Apartments <strong>*</strong> </label>
        <input name="numapartments" type="number" id="numapartments" class="numberinput" min="0" />
        <br />
      </div>
      ${this.floorInputHtml}
      ${this.basementInputHtml}
      </form>
    </div>
    </div>

${this.radioButtonsHtml} `;
  };

  renderCommercialForm = () => {
    this.$formContainer.innerHTML = '';
    this.$formContainer.innerHTML = `<div id="commercialform" class="m-30 w-100p">
    <h4>Tell Us About Your Project</h4>
    <br />
    <div class="ml-auto mr-auto">
    <form>
      <div>
        <label for="numdistinctbusinesses">Number Of Distinct Businesses</label>
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
        <label for="numparkingspaces">Number Of Parking Spaces</label>
        <input name="numparkingspaces" type="number" id="numparkingspaces" class="numberinput" min="0"/>
      </div>
      <div>
        <label for="numshafts">Required Elevator Quantity  <strong>*</strong></label>
        <input name="numshafts" type="number" id="numshafts" class="numberinput" min="0" />
      </div>
    </div>
    </form>
  </div>
    <br />
${this.radioButtonsHtml}`;
  };

  renderCorpForm = () => {
    this.$formContainer.innerHTML = '';
    this.$formContainer.innerHTML = `<div id="corporateform" class="m-30 w-100p">
    <h4>Tell Us About Your Project</h4>
    <br />
    <div class="ml-auto mr-auto">
    <form>
      <div>
        <label for="numtenantcompanies">Number Of Tenant Companies</label>
        <input name="numtenantcompanies" type="number" id="numtenantcompanies" class="numberinput" min="0" /> <br />
      </div>
      ${this.floorInputHtml}
      ${this.basementInputHtml}

      <div>
        <label for="numparkingspaces">Number Of Parking Spaces</label>
        <input name="numparkingspaces" type="number" id="numparkingspaces"  class="numberinput" min="0" />
      </div>
      <div> <label for="maxoccupantsperfloor">Maximum Number Of Occupants Per Floor  <strong>*</strong> </label>
        <input name="maxoccupantsperfloor" type="number" id="maxoccupantsperfloor" class="numberinput" min="0" /> 
     </div>
    </div>
    </form>
  </div> <br />
${this.radioButtonsHtml}`;
  };

  renderHybridForm = () => {
    this.$formContainer.innerHTML = '';
    this.$formContainer.innerHTML = `<div id="corporateform" class="m-30 w-100p">
    <h4>Tell Us About Your Project</h4>
    <br />
    <div class="ml-auto mr-auto">
    <form>
      <div> <label for="numtenantcompanies">Number Of Tenant Companies</label>
        <input name="numtenantcompanies" type="number" id="numtenantcompanies" class="numberinput" min="0" /> <br />
      </div>
      ${this.floorInputHtml}
      ${this.basementInputHtml}
      <div>
        <label for="numparkingspaces">Number Of Parking Spaces</label>
        <input name="numparkingspaces" type="number" id="numparkingspaces"  class="numberinput" min="0"/>
      </div>
      <div> <label for="maxoccupantsperfloor">Maximum Number Of Occupants Per Floor <strong>*</strong> </label>
      <input name="maxoccupantsperfloor" type="number" id="maxoccupantsperfloor" class="numberinput" min="0"/>
      </div>
       <div> <label for="hoursofoperation"> Hours of Operation </label>
        <input name="hoursofoperation" type="number" id="hoursofoperation" class="numberinput" max="24" min="0" />
      </div>
    </div>
    </form>
  </div> <br />
  ${this.radioButtonsHtml}`;
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
