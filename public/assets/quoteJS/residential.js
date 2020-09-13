class Residential extends Quote {
  constructor() {
    super();
    this.selectedForm = 'Residential';

    validateResInputs = () => {
      if (
        super.numApartments &&
        super.numFloors &&
        super.numBasements &&
        super.numFloors != super.numBasements
      ) {
        return true;
      }
      console.log('no');
    };
  }
}
