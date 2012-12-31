// # domino - DOM selector
//
// `domino.nodes` is an array of filters and each filter is an array of DAL
// elements

var domino = function (selector) {
  var K_SELECTOR_NULL     = 0
    , K_SELECTOR_ELEMENT  = 1
    , K_SELECTOR_ID       = 2
    , K_SELECTOR_CLASS    = 3
    , K_SELECTOR_TAG      = 4
    , K_SELECTOR_HTML     = 5

  function selectorType(selector) {
    if (!selector) return K_SELECTOR_NULL;
    if (typeof selector === 'object') return K_SELECTOR_ELEMENT;
    if (typeof selector === 'string') {
      if (/^[#]\w$]/.test(selector)) return K_SELECTOR_ID;
      if (/^[.]\w$/.test(selector)) return K_SELECTOR_CLASS;
      if (/^\w$/.test(selector)) return K_SELECTOR_TAG;
      return K_SELECTOR_HTML;
    }
  }

  function getNodes () {
    var arr = [];
    switch (selectorType(selector)) {
      case K_SELECTOR_NULL:
        arr = [].concat(dal());
        break;
      case K_SELECTOR_ELEMENT:
        arr = [].concat(dal(selector));
        break;
      case K_SELECTOR_ID:
        arr = [].concat(dal(selector));
        break;
      case K_SELECTOR_CLASS:
        arr = document.getElementsByClassName(selector)
          .map(function (el) { return dal(el); });
        break;
      case K_SELECTOR_TAG:
        arr = document.getElementsByTagName(selector)
          .map(function (el) { return dal(el); });
        break;
      case K_SELECTOR_HTML:
        arr = dal().html(selector).DOM.childNodes
          .map(function (el) { return dal(el); });
        break;
    }
    return arr;
  }

  var self = {};
  self.nodes = [];

  self.nodes.push(getNodes());

  self.filter = function (selector) {
    switch (selectorType(selector)) {
      case K_SELECTOR_CLASS:
        self.nodes.push(self.nodes.filter(function (el) {
          return el.DOM.classList.contains(selector);
        }));
        break;
      case K_SELECTOR_TAG:
        self.nodes.push(self.nodes.filter(function (el) {
          return (el.DOM.tagName.toUpper() === selector.toUpper());
        }));
        break;
    }
    return self;
  }

  self.del = function () {
    self.nodes[arr.length - 1].foreach(function (el) {
      el.detach();
    });
    self.nodes.pop();
    return self;
  }

  self.foreach = function (callback) {
    self.nodes[arr.length - 1].foreach(callback);
    return self;
  }

  return self;
}
