import faker from 'faker';

const COLUMN_COUNT = 10;
const ROW_COUNT = 500;

export default function generateContent() {
  return new Array(ROW_COUNT).fill(0).map(() => ({
    id: faker.random.uuid(),
    data: new Array(COLUMN_COUNT)
      .fill(0)
      .map(() => faker.lorem.sentence(faker.random.number({ min: 1, max: 5 })))
  }));
}
