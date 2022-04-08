'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var issueWearable = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(contract, beneficiary, index, from) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return contract.issueToken(beneficiary, index, wearables[index].issued, from);

          case 2:
            wearables[index].issued++;

          case 3:
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

var ERC721DeterministicCollection = artifacts.require('DummyERC721DeterministicCollection');

var wearables = _collection.WEARABLES.map(function (w) {
  return _extends({}, w, { issued: 1 });
});

function cleanIssuances() {
  wearables = _collection.WEARABLES.map(function (w) {
    return _extends({}, w, { issued: 1 });
  });
}

function encodeTokenId(a, b) {
  return web3.utils.toBN('0x' + web3.utils.padLeft(a, 10).replace('0x', '') + web3.utils.padLeft(b, 54).replace('0x', ''));
}

function decodeTokenId(id) {
  var hexId = web3.utils.padLeft(web3.utils.toHex(id), 64).replace('0x', '');

  return [web3.utils.toBN(hexId.substr(0, 10)), web3.utils.toBN(hexId.substr(10, hexId.length))];
}

describe('Deterministic Collection', function () {
  // option id = 0
  // issued id = 1
  var token1 = encodeTokenId(0, 1);

  // option id = 0
  // issued id = 2
  var token2 = encodeTokenId(0, 2);

  // option id = 1
  // issued id = 1
  var token3 = encodeTokenId(1, 1);

  (0, _baseCollection.doTest)(ERC721DeterministicCollection, _collection.CONTRACT_NAME, _collection.CONTRACT_SYMBOL, _collection.WEARABLES, issueWearable, cleanIssuances, [token1, token2, token3]);

  describe('Issuance', function () {
    var _this = this;

    // Wearables
    var wearable0 = _collection.WEARABLES[0].name;
    var wearable1 = _collection.WEARABLES[1].name;
    var wearable0Hash = web3.utils.soliditySha3(wearable0);
    var wearable1Hash = web3.utils.soliditySha3(wearable1);

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
              return ERC721DeterministicCollection.new(_collection.CONTRACT_NAME, _collection.CONTRACT_SYMBOL, user, BASE_URI, _extends({}, fromDeployer, {
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

    afterEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cleanIssuances();

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    })));

    describe('issueToken', function () {
      it('should issue a token', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _ref5, logs, issued, totalSupply, owner, uri, uriArr;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return contractInstance.issueToken(anotherHolder, 0, wearables[0].issued, fromUser);

              case 2:
                _ref5 = _context4.sent;
                logs = _ref5.logs;
                _context4.next = 6;
                return contractInstance.issued(wearable0Hash);

              case 6:
                issued = _context4.sent;

                expect(issued).to.eq.BN(1);
                expect(logs.length).to.be.equal(2);
                expect(logs[1].event).to.be.equal('Issue');
                expect(logs[1].args._beneficiary).to.be.equal(anotherHolder);
                expect(logs[1].args._tokenId).to.be.eq.BN(token1);
                expect(logs[1].args._wearableIdKey).to.be.equal(wearable0Hash);
                expect(logs[1].args._wearableId).to.be.equal(wearable0);
                expect(logs[1].args._issuedId).to.eq.BN(issued);

                // match total supply
                _context4.next = 17;
                return contractInstance.totalSupply();

              case 17:
                totalSupply = _context4.sent;

                expect(totalSupply).to.eq.BN(1);

                // match owner
                _context4.next = 21;
                return contractInstance.ownerOf(token1);

              case 21:
                owner = _context4.sent;

                expect(owner).to.be.equal(anotherHolder);

                // match URI
                _context4.next = 25;
                return contractInstance.tokenURI(token1);

              case 25:
                uri = _context4.sent;
                uriArr = uri.split('/');

                expect(issued).to.eq.BN(uri.split('/')[uriArr.length - 1]);
                expect(wearables[0].name).to.eq.BN(uri.split('/')[uriArr.length - 2]);

              case 29:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      })));

      it('should issue a deterministic token', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var tokenId, _ref7, logs, issued, totalSupply, owner, uri, uriArr;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // option id = 0
                // issued id = 10
                tokenId = web3.utils.toBN('0x000000000000000000000000000000000000000000000000000000000000000A');
                _context5.next = 3;
                return contractInstance.issueToken(anotherHolder, 0, 10, fromUser);

              case 3:
                _ref7 = _context5.sent;
                logs = _ref7.logs;
                _context5.next = 7;
                return contractInstance.issued(wearable0Hash);

              case 7:
                issued = _context5.sent;

                expect(issued).to.eq.BN(1);
                expect(logs.length).to.be.equal(2);
                expect(logs[1].event).to.be.equal('Issue');
                expect(logs[1].args._beneficiary).to.be.equal(anotherHolder);
                expect(logs[1].args._tokenId).to.be.eq.BN(tokenId);
                expect(logs[1].args._wearableIdKey).to.be.equal(wearable0Hash);
                expect(logs[1].args._wearableId).to.be.equal(wearable0);
                expect(logs[1].args._issuedId).to.eq.BN(10);

                // match total supply
                _context5.next = 18;
                return contractInstance.totalSupply();

              case 18:
                totalSupply = _context5.sent;

                expect(totalSupply).to.eq.BN(1);

                // match owner
                _context5.next = 22;
                return contractInstance.ownerOf(tokenId);

              case 22:
                owner = _context5.sent;

                expect(owner).to.be.equal(anotherHolder);

                // match URI
                _context5.next = 26;
                return contractInstance.tokenURI(tokenId);

              case 26:
                uri = _context5.sent;
                uriArr = uri.split('/');

                expect(10).to.eq.BN(uri.split('/')[uriArr.length - 1]);
                expect(wearables[0].name).to.be.equal(uri.split('/')[uriArr.length - 2]);

              case 30:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      })));

      it('reverts when issuing a token by not allowed user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueToken(anotherHolder, 0, wearables[0].issued, fromHacker), 'Only an `allowed` address can issue tokens');

              case 2:
                _context6.next = 4;
                return (0, _assertRevert2.default)(contractInstance.issueToken(anotherHolder, 0, wearables[0].issued), 'Only an `allowed` address can issue tokens');

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      })));

      it('reverts when issuing a token to an invalid address', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueToken(_collection.ZERO_ADDRESS, 0, wearables[0].issued, fromUser), 'ERC721: mint to the zero address');

              case 2:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      })));

      it('reverts when trying to issue an already minted wearable', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return contractInstance.issueToken(holder, 0, 1, fromUser);

              case 2:
                _context8.next = 4;
                return (0, _assertRevert2.default)(contractInstance.issueToken(holder, 0, 1, fromUser), 'ERC721: token already minted');

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      })));

      it('reverts when trying to issue an invalid wearable option id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueToken(holder, wearables.length, 1, fromUser), 'Invalid option id');

              case 2:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      })));

      it('reverts when trying to issue an invalid wearable issued id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueToken(holder, 0, wearables[0].max + 1, fromUser), 'Invalid issued id');

              case 2:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      })));
    });

    describe('issueTokens', function () {
      it('should issue multiple token', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _ref14, logs, issued, owner, uri, uriArr, totalSupply;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return contractInstance.issueTokens([holder, anotherHolder], [1, 0], [1, 1], fromUser);

              case 2:
                _ref14 = _context11.sent;
                logs = _ref14.logs;
                _context11.next = 6;
                return contractInstance.issued(wearable1Hash);

              case 6:
                issued = _context11.sent;

                expect(issued).to.eq.BN(1);
                expect(logs.length).to.be.equal(4);
                expect(logs[1].event).to.be.equal('Issue');
                expect(logs[1].args._beneficiary).to.be.equal(holder);
                expect(logs[1].args._tokenId).to.be.eq.BN(token3);
                expect(logs[1].args._wearableIdKey).to.be.equal(wearable1Hash);
                expect(logs[1].args._wearableId).to.be.equal(wearable1);
                expect(logs[1].args._issuedId).to.eq.BN(issued);

                // match owner
                _context11.next = 17;
                return contractInstance.ownerOf(token3);

              case 17:
                owner = _context11.sent;

                expect(owner).to.be.equal(holder);

                // match wearable id
                _context11.next = 21;
                return contractInstance.tokenURI(token3);

              case 21:
                uri = _context11.sent;
                uriArr = uri.split('/');

                expect(issued).to.eq.BN(uri.split('/')[uriArr.length - 1]);
                expect(wearables[1].name).to.be.equal(uri.split('/')[uriArr.length - 2]);

                // Wearable0
                // match issued
                _context11.next = 27;
                return contractInstance.issued(wearable0Hash);

              case 27:
                issued = _context11.sent;

                expect(issued).to.eq.BN(1);
                expect(logs[3].event).to.be.equal('Issue');
                expect(logs[3].args._beneficiary).to.be.equal(anotherHolder);
                expect(logs[3].args._tokenId).to.be.eq.BN(token1);
                expect(logs[3].args._wearableIdKey).to.be.equal(wearable0Hash);
                expect(logs[3].args._wearableId).to.be.equal(wearable0);
                expect(logs[3].args._issuedId).to.eq.BN(issued);

                // match owner
                _context11.next = 37;
                return contractInstance.ownerOf(token1);

              case 37:
                owner = _context11.sent;

                expect(owner).to.be.equal(anotherHolder);

                // match wearable id
                _context11.next = 41;
                return contractInstance.tokenURI(token1);

              case 41:
                uri = _context11.sent;

                uriArr = uri.split('/');
                expect(issued).to.eq.BN(uri.split('/')[uriArr.length - 1]);
                expect(wearables[0].name).to.be.equal(uri.split('/')[uriArr.length - 2]);

                // Match total supply
                _context11.next = 47;
                return contractInstance.totalSupply();

              case 47:
                totalSupply = _context11.sent;

                expect(totalSupply).to.eq.BN(2);

              case 49:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      })));

      it('reverts when issuing a token by not allowed user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([holder, anotherHolder], [0, 0], [1, 2], fromHacker), 'Only an `allowed` address can issue tokens');

              case 2:
                _context12.next = 4;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([holder, anotherHolder], [0, 0], [1, 2]), 'Only an `allowed` address can issue tokens');

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      })));

      it('reverts if trying to issue tokens with invalid argument length', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([user], [0, 0], [1, 2], fromUser), 'Parameters should have the same length');

              case 2:
                _context13.next = 4;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([user], [0, 0], [1], fromUser), 'Parameters should have the same length');

              case 4:
                _context13.next = 6;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([user, anotherUser], [0], [1, 1], fromUser), 'Parameters should have the same length');

              case 6:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      })));

      it('reverts when issuing a token to an invalid address', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([anotherHolder, _collection.ZERO_ADDRESS], [0, 0], [1, 2], fromUser), 'ERC721: mint to the zero address');

              case 2:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      })));

      it('reverts when trying to issue an already minted wearable', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return contractInstance.issueTokens([holder, anotherHolder], [0, 0], [1, 2], fromUser);

              case 2:
                _context15.next = 4;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([holder, anotherHolder], [0, 0], [3, 1], fromUser), 'ERC721: token already minted');

              case 4:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      })));

      it('reverts when trying to issue an invalid wearable option id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([holder, anotherHolder], [0, wearables.length], [1, 1], fromUser), 'Invalid option id');

              case 2:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      })));

      it('reverts when trying to issue an invalid wearable issued id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return (0, _assertRevert2.default)(contractInstance.issueTokens([holder, anotherHolder], [0, 0], [1, wearables[0].max + 1], fromUser), 'Invalid issued id');

              case 2:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      })));
    });

    describe('tokenURI', function () {
      it('should return the correct token URI', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var uri, uriArr;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return contractInstance.issueToken(holder, 3, 99, fromUser);

              case 2:
                _context18.next = 4;
                return contractInstance.tokenURI(encodeTokenId(3, 99));

              case 4:
                uri = _context18.sent;
                uriArr = uri.split('/');

                expect(99).to.eq.BN(uri.split('/')[uriArr.length - 1]);
                expect(wearables[3].name).to.be.equal(uri.split('/')[uriArr.length - 2]);

              case 8:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      })));

      it('reverts if the token does not exist', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return (0, _assertRevert2.default)(contractInstance.tokenURI(encodeTokenId(0, 1)), 'ERC721Metadata: received a URI query for a nonexistent token');

              case 2:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this);
      })));
    });

    describe('addWearable', function () {
      it('reverts when trying to add a wearable with a max supply greater than 27 bytes', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        var maxSupply, one;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                maxSupply = web3.utils.toBN(web3.utils.padLeft('0xff', 54, 'f'));
                one = web3.utils.toBN(1);
                _context20.next = 4;
                return contractInstance.addWearable('wearable', maxSupply);

              case 4:
                _context20.next = 6;
                return (0, _assertRevert2.default)(contractInstance.addWearable('wearable', maxSupply.add(one)), 'Max issuance should be lower or equal than MAX_ISSUANCE');

              case 6:
              case 'end':
                return _context20.stop();
            }
          }
        }, _callee20, this);
      })));
    });

    describe('encodeTokenId', function () {
      it('should encode a token id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
        var expectedId, decoded;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return contractInstance.encodeTokenId(0, 1);

              case 2:
                expectedId = _context21.sent;
                decoded = decodeTokenId(expectedId);

                expect(expectedId).to.eq.BN(encodeTokenId(0, 1));
                expect(0).to.eq.BN(decoded[0]);
                expect(1).to.eq.BN(decoded[1]);

                _context21.next = 9;
                return contractInstance.encodeTokenId(1, 0);

              case 9:
                expectedId = _context21.sent;

                decoded = decodeTokenId(expectedId);
                expect(expectedId).to.eq.BN(encodeTokenId(1, 0));
                expect(1).to.eq.BN(decoded[0]);
                expect(0).to.eq.BN(decoded[1]);

                _context21.next = 16;
                return contractInstance.encodeTokenId(11232232, 1123123123);

              case 16:
                expectedId = _context21.sent;

                decoded = decodeTokenId(expectedId);
                expect(expectedId).to.eq.BN(encodeTokenId(11232232, 1123123123));
                expect(11232232).to.eq.BN(decoded[0]);
                expect(1123123123).to.eq.BN(decoded[1]);

                _context21.next = 23;
                return contractInstance.encodeTokenId(4569428193, 90893249234);

              case 23:
                expectedId = _context21.sent;

                decoded = decodeTokenId(expectedId);
                expect(expectedId).to.eq.BN(encodeTokenId(4569428193, 90893249234));
                expect(4569428193).to.eq.BN(decoded[0]);
                expect(90893249234).to.eq.BN(decoded[1]);

              case 28:
              case 'end':
                return _context21.stop();
            }
          }
        }, _callee21, this);
      })));

      it('revert when the first value is greater than 5 bytes', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
        var max, one, expectedId;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                max = web3.utils.toBN(web3.utils.padLeft('0xff', 10, 'f'));
                one = web3.utils.toBN(1);
                _context22.next = 4;
                return contractInstance.encodeTokenId(max, 0);

              case 4:
                expectedId = _context22.sent;

                expect(expectedId).to.eq.BN(encodeTokenId(max, 0));

                _context22.next = 8;
                return (0, _assertRevert2.default)(contractInstance.encodeTokenId(max.add(one), 0), 'The option id should be lower or equal than the MAX_OPTIONS');

              case 8:
              case 'end':
                return _context22.stop();
            }
          }
        }, _callee22, this);
      })));

      it('revert when the second value is greater than 27 bytes', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
        var max, one, expectedId;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                max = web3.utils.toBN(web3.utils.padLeft('0xff', 54, 'f'));
                one = web3.utils.toBN(1);
                _context23.next = 4;
                return contractInstance.encodeTokenId(0, max);

              case 4:
                expectedId = _context23.sent;

                expect(expectedId).to.eq.BN(encodeTokenId(0, max));

                _context23.next = 8;
                return (0, _assertRevert2.default)(contractInstance.encodeTokenId(0, max.add(one)), 'The issuance id should be lower or equal than the MAX_ISSUANCE');

              case 8:
              case 'end':
                return _context23.stop();
            }
          }
        }, _callee23, this);
      })));
    });

    describe('decodeTokenId', function () {
      it('should decode a token id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
        var expectedValues;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return contractInstance.decodeTokenId(encodeTokenId(0, 1));

              case 2:
                expectedValues = _context24.sent;

                expect(expectedValues[0]).to.eq.BN(0);
                expect(expectedValues[1]).to.eq.BN(1);

                _context24.next = 7;
                return contractInstance.decodeTokenId(encodeTokenId(1, 0));

              case 7:
                expectedValues = _context24.sent;

                expect(expectedValues[0]).to.eq.BN(1);
                expect(expectedValues[1]).to.eq.BN(0);

                _context24.next = 12;
                return contractInstance.decodeTokenId(encodeTokenId(124, 123212));

              case 12:
                expectedValues = _context24.sent;

                expect(expectedValues[0]).to.eq.BN(124);
                expect(expectedValues[1]).to.eq.BN(123212);

                _context24.next = 17;
                return contractInstance.decodeTokenId(encodeTokenId(4569428193, 90893249234));

              case 17:
                expectedValues = _context24.sent;

                expect(expectedValues[0]).to.eq.BN(4569428193);
                expect(expectedValues[1]).to.eq.BN(90893249234);

              case 20:
              case 'end':
                return _context24.stop();
            }
          }
        }, _callee24, this);
      })));
    });
  });
});