export default class Reservations {
  constructor(name, startDate, endDate) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  let reservation = () => {
    reservations.push(
      {
        'name': this.name,
        'start': this.startDate,
        'end': this.endDate
      }
    )
  }
}