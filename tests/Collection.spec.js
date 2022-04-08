'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var issueWearable = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(contract, beneficiary, index, from) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', contract.issueToken(beneficiary, _collection.WEARABLES[index].name, from));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function issueWearable(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _assertRevert = require('./helpers/assertRevert');

var _assertRevert2 = _interopRequireDefault(_assertRevert);

var _baseCollection = require('./helpers/baseCollection');

var _collection = require('./helpers/collection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ERC721Collection = artifacts.require('ERC721Collection');

describe('Collection', function () {
  (0, _baseCollection.doTest)(ERC721Collection, _collection.CONTRACT_NAME, _collection.CONTRACT_SYMBOL, _collection.WEARABLES, issueWearable);

  describe('Issuance', function () {
    // Wearables
    var wearable0 = _collection.WEARABLES[0].name;
    var wearable1 = _collection.WEARABLES[1].name;
    var wearable2 = _collection.WEARABLES[2].name;
    var wearable0Hash = web3.utils.soliditySha3(wearable0);
    var wearable1Hash = web3.utils.soliditySha3(wearable1);
    var wearable2Hash = web3.utils.soliditySha3(wearable2);
    var invalidWearable = 'invalid_wearable';

    var BASE_URI = _collection.BASE_URI + (_collection.CONTRACT_NAME + '/wearables/');

    // Accounts
    var accounts = void 0;
    var deployer = void 0;
    var user = void 0;
    var anotherUser = void 0;
    var hacker = void 0;
    var holder = void 0;
    var anotherHolder = void 0;
    var fromUser = void 0;
    var fromHolder = void 0;
    var fromHacker = void 0;
    var fromDeployer = void 0;

    // Contracts
    var contractInstance = void 0;

    beforeEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return web3.eth.getAccounts();

            case 2:
              accounts = _context2.sent;

              deployer = accounts[0];
              user = accounts[1];
              holder = accounts[2];
              anotherHolder = accounts[3];
              anotherUser = accounts[4];
              hacker = accounts[5];
              fromUser = { from: user };
              fromHolder = { from: holder };
              fromHacker = { from: hacker };

              fromDeployer = { from: deployer };

              _context2.next = 15;
              return ERC721Collection.new(_collection.CONTRACT_NAME, _collection.CONTRACT_SYMBOL, user, BASE_URI, _extends({}, fromDeployer, {
                gas: 6e6,
                gasPrice: 21e9
              }));

            case 15:
              contractInstance = _context2.sent;
              _context2.next = 18;
              return (0, _collection.setupWearables)(contractInstance, _collection.WEARABLES);

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));

    describe('issueToken', function () {
      it('should issue a token', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _ref4, logs, issued, totalSupply, owner, uri;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return contractInstance.issueToken(anotherHolder, wearable0, fromUser);

              case 2:
                _ref4 = _context3.sent;
                logs = _ref4.logs;
                _context3.next = 6;
                return contractInstance.issued(wearable0Hash);

              case 6:
                issued = _context3.sent;

                expect(issued).to.eq.BN(1);
                _context3.next = 10;
                return contractInstance.totalSupply();

              case 10:
                totalSupply = _context3.sent;

                expect(logs.length).to.be.equal(2);
                expect(logs[1].event).to.be.equal('Issue');
                expect(logs[1].args._beneficiary).to.be.equal(anotherHolder);
                expect(logs[1].args._tokenId).to.be.eq.BN(totalSupply.toNumber() - 1);
                expect(logs[1].args._wearableIdKey).to.be.equal(wearable0Hash);
                expect(logs[1].args._wearableId).to.be.equal(wearable0);
                expect(logs[1].args._issuedId).to.eq.BN(issued);

                // match owner
                _context3.next = 20;
                return contractInstance.ownerOf(totalSupply.toNumber() - 1);

              case 20:
                owner = _context3.sent;

                expect(owner).to.be.equal(anotherHolder);

                // match wearable id
                _context3.next = 24;
                return contractInstance.tokenURI(totalSupply.toNumber() - 1);

              case 24:
                uri = _context3.sent;

                expect(issued).to.eq.BN(uri.split('/').pop());

              case 26:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      })));

      it('reverts when issuing a token by not allowed user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueToken(anotherHolder, wearable0, fromHacker), 'Only an `allowed` address can issue tokens');

              case 2:
                _context4.next = 4;
                return (0, _assertRevert2.default)(contractInstance.issueToken(anotherHolder, wearable0), 'Only an `allowed` address can issue tokens');

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      })));

      it('reverts when issuing a token to an invalid address', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueToken(_collection.ZERO_ADDRESS, wearable0, fromUser), 'ERC721: mint to the zero address');

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      })));

      it('reverts when issuing an invalid wearable', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueToken(anotherHolder, invalidWearable, fromUser), 'invalid: trying to issue an exhausted wearable of nft');

              case 2:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      })));

      it('reverts when trying to issue a full wearable', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var maxKind, i, issued;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return contractInstance.maxIssuance(wearable2Hash);

              case 2:
                maxKind = _context7.sent;
                i = 0;

              case 4:
                if (!(i < maxKind.toNumber())) {
                  _context7.next = 10;
                  break;
                }

                _context7.next = 7;
                return contractInstance.issueToken(holder, wearable2, fromUser);

              case 7:
                i++;
                _context7.next = 4;
                break;

              case 10:
                _context7.next = 12;
                return contractInstance.issued(wearable2Hash);

              case 12:
                issued = _context7.sent;


                expect(issued).to.eq.BN(maxKind);

                _context7.next = 16;
                return (0, _assertRevert2.default)(contractInstance.issueToken(holder, wearable2, fromUser), 'invalid: trying to issue an exhausted wearable of nft');

              case 16:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      })));
    });

    describe('issueTokens', function () {
      it('should issue multiple token', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _ref10, logs, issued, totalSupply, owner, uri;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return contractInstance.issueTokens([holder, anotherHolder], [web3.utils.fromAscii(wearable1), web3.utils.fromAscii(wearable0)], fromUser);

              case 2:
                _ref10 = _context8.sent;
                logs = _ref10.logs;
                _context8.next = 6;
                return contractInstance.issued(wearable1Hash);

              case 6:
                issued = _context8.sent;

                expect(issued).to.eq.BN(1);
                _context8.next = 10;
                return contractInstance.totalSupply();

              case 10:
                totalSupply = _context8.sent;

                expect(logs.length).to.be.equal(4);
                expect(logs[1].event).to.be.equal('Issue');
                expect(logs[1].args._beneficiary).to.be.equal(holder);
                expect(logs[1].args._tokenId).to.be.eq.BN(totalSupply.toNumber() - 2);
                expect(logs[1].args._wearableIdKey).to.be.equal(wearable1Hash);
                expect(logs[1].args._wearableId).to.be.equal(wearable1);
                expect(logs[1].args._issuedId).to.eq.BN(issued);

                // match owner
                _context8.next = 20;
                return contractInstance.ownerOf(totalSupply.toNumber() - 2);

              case 20:
                owner = _context8.sent;

                expect(owner).to.be.equal(holder);
                // match wearable id
                _context8.next = 24;
                return contractInstance.tokenURI(totalSupply.toNumber() - 2);

              case 24:
                uri = _context8.sent;

                expect(issued).to.eq.BN(uri.split('/').pop());

                // Wearable0
                // match issued
                _context8.next = 28;
                return contractInstance.issued(wearable0Hash);

              case 28:
                issued = _context8.sent;

                expect(issued).to.eq.BN(1);
                expect(logs[3].event).to.be.equal('Issue');
                expect(logs[3].args._beneficiary).to.be.equal(anotherHolder);
                expect(logs[3].args._tokenId).to.be.eq.BN(totalSupply.toNumber() - 1);
                expect(logs[3].args._wearableIdKey).to.be.equal(wearable0Hash);
                expect(logs[3].args._wearableId).to.be.equal(wearable0);
                expect(logs[3].args._issuedId).to.eq.BN(issued);

                // match owner
                _context8.next = 38;
                return contractInstance.ownerOf(totalSupply.toNumber() - 1);

              case 38:
                owner = _context8.sent;

                expect(owner).to.be.equal(anotherHolder);

                // match wearable id
                _context8.next = 42;
                return contractInstance.tokenURI(totalSupply.toNumber() - 1);

              case 42:
                uri = _context8.sent;

                expect(issued).to.eq.BN(uri.split('/').pop());

              case 44:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      })));

      it('reverts when issuing a token by not allowed user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([holder, anotherHolder], [web3.utils.fromAscii(wearable1), web3.utils.fromAscii(wearable0)], fromHacker), 'Only an `allowed` address can issue tokens');

              case 2:
                _context9.next = 4;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([holder, anotherHolder], [web3.utils.fromAscii(wearable1), web3.utils.fromAscii(wearable0)]), 'Only an `allowed` address can issue tokens');

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      })));

      it('reverts if trying to issue tokens with invalid argument length', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([user], [web3.utils.fromAscii(_collection.WEARABLES[0].name), web3.utils.fromAscii(_collection.WEARABLES[1].name)], fromUser), 'Parameters should have the same length');

              case 2:
                _context10.next = 4;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([user, anotherUser], [web3.utils.fromAscii(_collection.WEARABLES[0].name)], fromUser), 'Parameters should have the same length');

              case 4:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      })));

      it('reverts when issuing a token to an invalid address', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([anotherHolder, _collection.ZERO_ADDRESS], [web3.utils.fromAscii(wearable1), web3.utils.fromAscii(wearable0)], fromUser), 'ERC721: mint to the zero address');

              case 2:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      })));

      it('reverts when issuing an invalid wearable', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([anotherHolder, anotherHolder], [web3.utils.fromAscii(invalidWearable), web3.utils.fromAscii(wearable0)], fromUser), 'invalid: trying to issue an exhausted wearable of nft');

              case 2:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      })));
    });
  });
});