class Commercial extends Quote {
  constructor() {
    super();
    this.selectedForm = 'Commercial';
  }

  validateComInputs = () => {
    if (this.numShafts > 0) {
      return true;
    } else {
      this.$errorcontainer.innerHTML = this.errorMessage;
      this.$errorcontainer.classList = 'alert alert-danger m-30 text-center';
      console.log('no');
    }
  };
}
