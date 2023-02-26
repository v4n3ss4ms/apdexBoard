import { AppsData } from './appsData.js';

const A_HOST = 'A_HOST';
const AN_ANOTHER_HOST = 'AN_ANOTHER_HOST';
const AN_ALTERNATIVE_HOST = 'AN_ALTERNATIVE_HOST';
const A_NON_EXIST_HOST = 'A_NON_EXIST_HOST';
const A_HOST_TOP_APDEX = '99';
const AN_APP_NAME = 'AN_APP_NAME';
const A_NEW_APP_NAME = 'A_NEW_APP_NAME';
const A_NEW_APP = {
  apdex: 100,
  contributors: ['Jane Doe', 'Karen Doe'],
  host: [
    AN_ALTERNATIVE_HOST
  ],
  name: A_NEW_APP_NAME,
  version: 45,
};

const A_NON_VALID_NEW_APP_NO_HOSTS = {
  apdex: 100,
  contributors: ['Jane Doe', 'Karen Doe'],
  host: [],
  name: A_NEW_APP_NAME,
  version: 45,
};

const A_NON_VALID_NEW_APP_NOT_EXISTING_HOST = {
  apdex: 100,
  contributors: ['Jane Doe', 'Karen Doe'],
  host: ['THIS_HOST_DOESNT_EXIST'],
  name: A_NEW_APP_NAME,
  version: 45,
};

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
    apdex: A_HOST_TOP_APDEX,
    host: [A_HOST, AN_ANOTHER_HOST, AN_ALTERNATIVE_HOST],
  },
  {
    name: AN_APP_NAME,
    contributors: ['Mrs. Caleigh Rutherford'],
    version: 10,
    apdex: 68,
    host: [
      AN_ANOTHER_HOST,
      '128406fc-0d3f.tiana.biz',
      'e0419f48-6a5a.craig.info',
      A_HOST,
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
      A_HOST,
      'e0419f48-6a5a.craig.info',
      AN_ANOTHER_HOST,
    ],
  },
  {
    name: 'Rustic Wooden Bike - Jacobi - Ferry, Group',
    contributors: ['Marguerite Oberbrunner', 'Haleigh Crooks'],
    version: 3,
    apdex: 57,
    host: ['1d717554-bf17.sydnie.name', AN_ANOTHER_HOST],
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
      AN_ANOTHER_HOST,
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
      AN_ANOTHER_HOST,
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
      AN_ANOTHER_HOST,
      '1d717554-bf17.sydnie.name',
      'e7bf58af-f0be.dallas.biz',
    ],
  },
];

describe('AppsData', () => {
  it('checks byHost sorting', () => {
    const appsData = new AppsData(MOCKED_DATA);
    const byHost = appsData.getByHost();

    expect(byHost[A_HOST].length).toBe(3);
  });

  it('checks byApdex sorting', () => {
    const appsData = new AppsData(MOCKED_DATA);
    const byApdex = appsData.getTopAppsByApdex();

    expect(byApdex[A_HOST][0].apdex).toBe(A_HOST_TOP_APDEX);
  });

  it('checks getTopAppsByHost by default (top 25)', () => {
    const appsData = new AppsData(MOCKED_DATA);
    const topAppsByHost = appsData.getTopAppsByHost(AN_ANOTHER_HOST);

    expect(topAppsByHost.length).toBe(7);
  });

  it('checks getTopAppsByHost, just the top 4', () => {
    const appsData = new AppsData(MOCKED_DATA);
    const topAppsByHost = appsData.getTopAppsByHost(AN_ANOTHER_HOST, 4);

    expect(topAppsByHost.length).toBe(4);
  });

  it('checks removeAppFromHosts - success', () => {
    const appsData = new AppsData(MOCKED_DATA);
    appsData.removeAppFromHosts(A_HOST, AN_APP_NAME);
    const byHost = appsData.getByHost();

    expect(byHost[A_HOST].length).toBe(2);
  });

  it('checks removeAppFromHosts - error', () => {
    const appsData = new AppsData(MOCKED_DATA);

    expect(() => {
      appsData.removeAppFromHosts(A_NON_EXIST_HOST, AN_APP_NAME);
    }).toThrow(A_NON_EXIST_HOST);
  });

  it('checks addAppToHosts - success', () => {
    const appsData = new AppsData(MOCKED_DATA);
    appsData.addAppToHosts(A_NEW_APP);
    const byHost = appsData.getByHost();

    expect(byHost[AN_ALTERNATIVE_HOST].length).toBe(2);
  });

  it('checks addAppToHosts - error: not valid app data', () => {
    const appsData = new AppsData(MOCKED_DATA);

    expect(() => {
      appsData.addAppToHosts(A_NON_VALID_NEW_APP_NO_HOSTS);
    }).toThrow();
  });

  it('checks addAppToHosts - error: non existing host', () => {
    const appsData = new AppsData(MOCKED_DATA);

    expect(() => {
      appsData.addAppToHosts(A_NON_VALID_NEW_APP_NOT_EXISTING_HOST);
    }).toThrow();
  });
});
