class CorporateHybrid extends Quote {
  validateChInputs = () => {
    if (this.maxOccupantsPerFloor && this.numFloors) {
      return true;
    } else {
      console.log('no');
      this.$errorcontainer.innerHTML = this.errorMessage;
      this.$errorcontainer.classList = 'alert alert-danger m-30 text-center';
    }
  };
}
