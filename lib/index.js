// # domino - DOM selector
//
// Manages an array of DAL nodes `domino.nodes`

var domino = function (selector) {
  var self = {};
  if (!selector) self.nodes = [].concat(dal());
  else if (typeof selector === 'object') self.nodes = [].concat(dal(selector));
  else if (typeof selection === 'string') {
    if (/^[#]/.test(selection)) self.nodes = [].concat(dal(selection));
    else if (/^[.]/.test(s)) {
      self.nodes = document
        .getElementsByClassName(selector)
        .map(function (el) {
          return dal(el);
        });
    } else {
      self.nodes = document
        .getElementsByTagName(selector)
        .map(function (el) {
          return dal(el);
        });
    }
  }

  return self;
}
