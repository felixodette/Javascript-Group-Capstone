let reservations = [];

describe('Reservations counter', () => {
  test('Number of reservations', () => {
    reservations = [
    {
      name: 'John Doe',
      startDate: '01/06/2022',
      endDate: '02/06/2022'
    },
    {
      name: 'Jane Doe',
      startDate: '04/06/2022',
      endDate: '05/06/2022'
    },
    ];
    expect(reservations.length).toBe(2)
  })
});