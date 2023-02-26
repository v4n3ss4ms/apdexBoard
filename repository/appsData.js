export class AppsData {
  constructor(rawData) {
    this.initRawData = rawData;
    this.byHost = this._organizeByHost();
    this.byApdex = this._orderByApdex();

    if (typeof AppsData.instance === 'object') {
      return AppsData.instance;
    }

    AppsData.instance = this;
    return this;
  }

  // # PRIVATE METHODS
  _organizeByHost() {
    let byHost = {};
    this.initRawData.forEach((e) => {
      e.host.forEach((h) => {
        if (!byHost[h]) {
          byHost[h] = [];
        }
        byHost[h].push(e);
      });
    });

    return byHost;
  }

  _quickSort([x = [], ...xs]) {
    return ( x.length === 0 ) ? [] : [...this._quickSort( xs.filter( y => y.apdex >= x.apdex ) ), x, ...this._quickSort(xs.filter( y => y.apdex < x.apdex ))];
  };

  _orderByApdex() {
    let byApdex = {};
    Object.keys(this.byHost).forEach((h) => {
      byApdex[h] = this._quickSort(this.byHost[h]);
    });

    return byApdex;
  }

  _updateByApdex() {
    this.byApdex = this._orderByApdex();
  }

  _isNewAppValid(newApp) {
    const isAppNameValid =
      typeof newApp.name === 'string' && newApp.name.length > 0;
    const isHostValid =
      typeof newApp.host === 'array' && newApp.host.length > 0;
    const isApdexValid = typeof newApp.apdex === 'number';
    const isContributorsValid =
      typeof newApp.contributors === 'array' && newApp.contributors.length > 0;
    const isVersionValid = typeof newApp.version === 'number';

    return (
      isAppNameValid &&
      isHostValid &&
      isApdexValid &&
      isContributorsValid &&
      isVersionValid
    );
  }

  // # PUBLIC METHODS
  getByHost() {
    return this.byHost;
  }

  getTopAppsByHost(hostName, top = 25) {
    return this.byApdex[hostName].slice(0, top);
  }

  getTopAppsByApdex() {
    return this.byApdex;
  }

  removeAppFromHosts(hostName, appName) {
    try {
      const index = this.byHost[hostName].findIndex(
        (element) => element.name === appName
      );
      this.byHost[hostName].splice(index, 1);
      this._updateByApdex();
    } catch (e) {
      const msg = `Host name ${hostName} doesn't exist`;
      console.warn(msg);
      throw new Error(msg);
    }
  }

  addAppToHosts(newApp) {
    try {
      if (this._isNewAppValid(newApp)) {
        newApp.host.forEach((h) => {
          this.byHost[h].push(newApp);
        });
        this._updateByApdex();
      } else {
        throw new Error('new app data is not valid');
      }
    } catch (e) {
      console.warn(e);
      throw new Error(e);
    }
  }
}
