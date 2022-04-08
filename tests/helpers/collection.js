'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createDummyCollection = exports.createDummyCollection = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
    var ERC721Collection, contract;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ERC721Collection = artifacts.require('ERC721Collection');
            _context.next = 3;
            return ERC721Collection.new(options.name || CONTRACT_NAME, options.symbol || CONTRACT_SYMBOL, options.allowed, options.baseURI || BASE_URI, options.creationParams);

          case 3:
            contract = _context.sent;
            _context.next = 6;
            return setupWearables(contract, WEARABLES);

          case 6:
            return _context.abrupt('return', contract);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createDummyCollection(_x) {
    return _ref.apply(this, arguments);
  };
}();

var setupWearables = exports.setupWearables = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(contract) {
    var wearables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : WEARABLES;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', contract.addWearables(wearables.map(function (w) {
              return web3.utils.fromAscii(w.name);
            }), wearables.map(function (w) {
              return w.max;
            })));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function setupWearables(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ZERO_ADDRESS = exports.ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
var BASE_URI = exports.BASE_URI = 'https://api-wearables.decentraland.org/v1/standards/erc721-metadata/collections/';

var CONTRACT_NAME = exports.CONTRACT_NAME = 'DummyCollection';
var CONTRACT_SYMBOL = exports.CONTRACT_SYMBOL = 'SymbolCollection';
var WEARABLES = exports.WEARABLES = [{ name: 'bird_mask', max: 100 }, { name: 'classic_mask', max: 100 }, { name: 'clown_nose', max: 100 }, { name: 'asian_fox', max: 100 }, { name: 'killer_mask', max: 100 }, { name: 'serial_killer_mask', max: 100 }, { name: 'theater_mask', max: 100 }, { name: 'tropical_mask', max: 100 }];