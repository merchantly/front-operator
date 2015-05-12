class Requester {
  constructor({eb}) {
    this.start = false;
    this.eb = eb;
    eb.on('start', () => {
      this.start = true;
      console.log('Requester started');
    });
  }

  request(options) {
    return this.start ? $.ajax(options) : this.eb.on('start', () => $.ajax(options));
  }
}

export default Requester;