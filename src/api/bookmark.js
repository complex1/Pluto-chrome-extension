/**
 * @typedef {Object} Bookmark
 * @property {string} id
 * @property {string} title
 * @property {string} url
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} description
 */

class Bookmark {
  constructor({
    id,
    title,
    url,
    createdAt,
    updatedAt,
    description,
  }) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.description = description;
  }
}

class BookmarkStorage {
  static saveBookmark(bookmark) {
    chrome.storage.local.get(['bookmarks'], function(result) {
      const bookmarks = result.bookmarks || [];
      bookmarks.push(bookmark);
      chrome.storage.local.set({ bookmarks: bookmarks }, function() {
        console.log('Bookmark saved');
      });
    });
  }

  static getBookmarks(callback) {
    chrome.storage.local.get(['bookmarks'], function(result) {
      callback(result.bookmarks || []);
    });
  }

  static updateBookmark(updatedBookmark) {
    chrome.storage.local.get(['bookmarks'], function(result) {
      const bookmarks = result.bookmarks || [];
      const index = bookmarks.findIndex(bookmark => bookmark.id === updatedBookmark.id);
      if (index !== -1) {
        bookmarks[index] = updatedBookmark;
        chrome.storage.local.set({ bookmarks: bookmarks }, function() {
          console.log('Bookmark updated');
        });
      }
    });
  }

  static deleteBookmark(id) {
    chrome.storage.local.get(['bookmarks'], function(result) {
      const bookmarks = result.bookmarks || [];
      const index = bookmarks.findIndex(bookmark => bookmark.id === id);
      if (index !== -1) {
        bookmarks.splice(index, 1);
        chrome.storage.local.set({ bookmarks: bookmarks }, function() {
          console.log('Bookmark deleted');
        });
      }
    });
  }
}