class FlightNotFoundException implements Error {
  constructor(id: string) {
    this.message = `Flight with id ${id} not found`;
    this.name = 'FlightNotFoundException';
  }
  message: string;
  name: string;
}
class FlightSearchCompanyException implements Error {
  constructor(company: string) {
    this.message = `No flights with ${company} found`;
    this.name = 'FlightSearchCompanyException';
  }
  message: string;
  name: string;
}

class FlightSearchStatusException implements Error {
  constructor(status: string) {
    this.message = `No flights with ${status} status found`;
    this.name = 'FlightSearchStatusException';
  }
  message: string;
  name: string;
}
class FlightSearchDepartureException implements Error {
  constructor(destination: string) {
    this.message = `No flights departing at ${destination} found`;
    this.name = 'FlightSearchDepartureException';
  }
  message: string;
  name: string;
}
class FlightSearchDestinationException implements Error {
  constructor(destination: string) {
    this.message = `No flights arriving at ${destination} found`;
    this.name = 'FlightSearchDestinationException';
  }
  message: string;
  name: string;
}
class FlightSearchDepartingDateException implements Error {
  constructor(date: string) {
    this.message = `No flight available with this date:${date}`;
    this.name = 'FlightSearchDepartingDateException';
  }
  message: string;
  name: string;
}

class FlightFindAllException implements Error {
  constructor() {
    this.message = `Flight search failed`;
    this.name = 'FlightFindAllException';
  }
  message: string;
  name: string;
}



