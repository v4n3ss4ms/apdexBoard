import { AppsData } from './appsData.js';

const A_HOST_FAKE = 'A_HOST_FAKE';
const ANOTHER_HOST_FAKE = 'ANOTHER_HOST_FAKE';
const A_HOST_FAKE_TOP_APDEX = '134';
const MOCKED_DATA = [
  {
    name: 'Unbranded Rubber Ball - Wintheiser, Moen and Schmidt, and Sons',
    contributors: [
      'Hildegard Ullrich',
      'Savanah Welch',
      'Alanna Kuphal',
      'Maxwell Hamill',
    ],
    version: 5,
    apdex: A_HOST_FAKE_TOP_APDEX,
    host: [A_HOST_FAKE, 'e0419f48-6a5a.craig.info', ANOTHER_HOST_FAKE],
  },
  {
    name: 'Rustic Granite Fish - Morissette, Weimann and Bogisich, and Sons',
    contributors: ['Mrs. Caleigh Rutherford'],
    version: 10,
    apdex: 68,
    host: [
      ANOTHER_HOST_FAKE,
      '128406fc-0d3f.tiana.biz',
      'e0419f48-6a5a.craig.info',
      A_HOST_FAKE,
    ],
  },
  {
    name: 'Sleek Granite Chair - Konopelski, Pfannerstill and Hintz, Inc',
    contributors: [
      'Angelina Kuhlman',
      'Miss Briana Moore',
      'Cole Lesch',
      'Stacy Kulas',
      'Wyman Robel IV',
    ],
    version: 4,
    apdex: 61,
    host: [
      '128406fc-0d3f.tiana.biz',
      'e7bf58af-f0be.dallas.biz',
      A_HOST_FAKE,
      'e0419f48-6a5a.craig.info',
      ANOTHER_HOST_FAKE,
    ],
  },
  {
    name: 'Rustic Wooden Bike - Jacobi - Ferry, Group',
    contributors: ['Marguerite Oberbrunner', 'Haleigh Crooks'],
    version: 3,
    apdex: 57,
    host: ['1d717554-bf17.sydnie.name', ANOTHER_HOST_FAKE],
  },
  {
    name: 'Fantastic Fresh Fish - Funk, Barrows and Lindgren, and Sons',
    contributors: [
      'Sonny White',
      'Damon White',
      'Ignacio Spencer',
      'Joel Abernathy',
    ],
    version: 4,
    apdex: 58,
    host: [
      ANOTHER_HOST_FAKE,
      'e0419f48-6a5a.craig.info',
      '1d717554-bf17.sydnie.name',
    ],
  },
  {
    name: 'Ergonomic Fresh Hat - Cormier, Lemke and Jaskolski, LLC',
    contributors: ['Antonina Marks', 'Brice Feest'],
    version: 10,
    apdex: 55,
    host: [
      ANOTHER_HOST_FAKE,
      'b0b655c5-928a.nadia.biz',
      'e7bf58af-f0be.dallas.biz',
      'e0419f48-6a5a.craig.info',
    ],
  },
  {
    name: 'Sleek Frozen Salad - Friesen - Brown, Inc',
    contributors: ['Salvador Ebert'],
    version: 6,
    apdex: 59,
    host: [
      ANOTHER_HOST_FAKE,
      '1d717554-bf17.sydnie.name',
      'e7bf58af-f0be.dallas.biz',
    ],
  },
];

describe('AppsData', () => {
  it('checks byHost sorting', () => {
    const appsData = new AppsData(MOCKED_DATA);
    const byHost = appsData.getByHost();
    
    expect(byHost[A_HOST_FAKE].length).toBe(3);
  });

  it('checks byApdex sorting', () => {
    const appsData = new AppsData(MOCKED_DATA);
    const byApdex = appsData.getTopAppsByApdex();
    expect(byApdex[A_HOST_FAKE][0].apdex).toBe(A_HOST_FAKE_TOP_APDEX);
  });

  it('checks getTopAppsByHost by default (top 25)', () => {
    const appsData = new AppsData(MOCKED_DATA);
    const topAppsByHost = appsData.getTopAppsByHost(ANOTHER_HOST_FAKE);
    expect(topAppsByHost.length).toBe(7);
  });

  it('checks getTopAppsByHost, just the top 4', () => {
    const appsData = new AppsData(MOCKED_DATA);
    const topAppsByHost = appsData.getTopAppsByHost(ANOTHER_HOST_FAKE, 4);
    expect(topAppsByHost.length).toBe(4);
  });
});
