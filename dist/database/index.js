"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  query: true
};
Object.defineProperty(exports, "query", {
  enumerable: true,
  get: function get() {
    return _query.query;
  }
});
var _connection = require("./connection.js");
Object.keys(_connection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _connection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _connection[key];
    }
  });
});
var _query = require("./query.js");