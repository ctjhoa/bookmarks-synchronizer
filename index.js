var self = require('sdk/self');
var git = require('git');

var bmsvc = Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"]
  .getService(Components.interfaces.nsINavBookmarksService);

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

// An nsINavBookmarkObserver
var myExt_bookmarkListener = {
  onBeginUpdateBatch: function() {},
  onEndUpdateBatch: function() {},
  onItemAdded: function(aItemId, aFolder, aIndex) {},
  onItemRemoved: function(aItemId, aFolder, aIndex) {},
  onItemChanged: function(aBookmarkId, aProperty, aIsAnnotationProperty, aValue) {
    MyExtension.doSomething();
  },
  onItemVisited: function(aBookmarkId, aVisitID, time) {},
  onItemMoved: function(aItemId, aOldParent, aOldIndex, aNewParent, aNewIndex) {},
  QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsINavBookmarkObserver])
};

// An extension
var MyExtension = {
  // This function is called when my add-on is loaded
  onLoad: function() {
    bmsvc.addObserver(myExt_bookmarkListener, false);
  },
  // This function is called when my add-on is unloaded
  onUnLoad: function() {
    bmsvc.removeObserver(myExt_bookmarkListener);
  },
  doSomething: function() {
    alert("Did something.");
  }
};

exports.dummy = dummy;
