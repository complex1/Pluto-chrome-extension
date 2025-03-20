/**
 * 
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} icon
 * @property {string} createdAt
 * @property {string} link
 * @protected {Array<string>} categories
 * 
 */

class App {
  constructor({
    id,
    name,
    description,
    icon,
    createdAt,
    link,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.createdAt = createdAt;
    this.link = link;
  }
}

class AppStorage {
  static saveApp(app) {
    chrome.storage.local.get(['apps'], function (result) {
      const apps = result.apps || [];
      apps.push(app);
      chrome.storage.local.set({ apps: apps }, function () {
        console.log('App saved');
      });
    });
  }

  /**
    * 
    * @param {Object} filter
    * @param {string} filter.searchKeyword
    * @param {Array<string>} filter.categories
    * @param {(apps: Array<App>) => void} callback
    */
  static getApps(filter, callback) {
    chrome.storage.local.get(['apps'], function (result) {
      let apps = result.apps || [];

      if (filter.searchKeyword) {
        apps = apps.filter(app =>
          app.name.includes(filter.searchKeyword) ||
          app.description.includes(filter.searchKeyword)
        );
      }

      if (filter.categories && filter.categories.length > 0) {
        apps = apps.filter(app =>
          filter.categories.some(category => app.categories.includes(category))
        );
      }

      callback(apps);
    });
  }

  static updateApp(updatedApp) {
    chrome.storage.local.get(['apps'], function (result) {
      const apps = result.apps || [];
      const index = apps.findIndex(app => app.id === updatedApp.id);
      if (index !== -1) {
        apps[index] = updatedApp;
        chrome.storage.local.set({ apps: apps }, function () {
          console.log('App updated');
        });
      }
    });
  }

  static deleteApp(appId) {
    chrome.storage.local.get(['apps'], function (result) {
      const apps = result.apps || [];
      const index = apps.findIndex(app => app.id === appId);
      if (index !== -1) {
        apps.splice(index, 1);
        chrome.storage.local.set({ apps: apps }, function () {
          console.log('App deleted');
        });
      }
    });
  }
}