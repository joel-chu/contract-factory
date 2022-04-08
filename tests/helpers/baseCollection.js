'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.doTest = doTest;

var _assertRevert = require('./assertRevert');

var _assertRevert2 = _interopRequireDefault(_assertRevert);

var _collection = require('./collection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var BN = web3.utils.BN;
var expect = require('chai').use(require('bn-chai')(BN)).expect;

var BASE_URI = _collection.BASE_URI;

function doTest(Contract, contractName, contractSymbol, wearables, issueWearable) {
  var afterEach = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {
    return {};
  };
  var tokenIds = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [0, 1, 2];

  describe('Base Collection', function () {
    var _this = this;

    this.timeout(100000);

    var creationParams = void 0;

    //wearable
    var wearable0 = wearables[0].name;
    var wearable1 = wearables[1].name;
    var wearable2 = wearables[2].name;
    var wearable0Hash = web3.utils.soliditySha3(wearable0);
    var wearable1Hash = web3.utils.soliditySha3(wearable1);
    var wearable2Hash = web3.utils.soliditySha3(wearable2);
    var issuance1 = 10;
    var newWearable1 = 'new_exclusive_wearable_1';
    var issuance2 = 10;
    var newWearable2 = 'new_exclusive_wearable_2';
    var newLongWearable1 = 'new_exclusive_wearable_1_super_super_long';

    // tokens
    var token1 = tokenIds[0];
    var token2 = tokenIds[1];
    var token3 = tokenIds[2];

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

    BASE_URI += contractName + '/wearables/';

    beforeEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return web3.eth.getAccounts();

            case 2:
              accounts = _context.sent;

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

              creationParams = _extends({}, fromDeployer, {
                gas: 6e6,
                gasPrice: 21e9
              });

              _context.next = 16;
              return Contract.new(contractName, contractSymbol, user, BASE_URI, creationParams);

            case 16:
              contractInstance = _context.sent;
              _context.next = 19;
              return (0, _collection.setupWearables)(contractInstance, wearables);

            case 19:
              _context.next = 21;
              return issueWearable(contractInstance, holder, 0, fromUser);

            case 21:
              _context.next = 23;
              return issueWearable(contractInstance, holder, 0, fromUser);

            case 23:
              _context.next = 25;
              return issueWearable(contractInstance, anotherHolder, 1, fromUser);

            case 25:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    this.afterEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              afterEach();

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    })));

    describe('Constructor', function () {
      it('should be depoyed with valid arguments', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var contract, baseURI, allowed, owner, name, symbol, wearableLength, i, wearableId, hash, max;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Contract.new(contractName, contractSymbol, user, BASE_URI, creationParams);

              case 2:
                contract = _context3.sent;
                _context3.next = 5;
                return contract.baseURI();

              case 5:
                baseURI = _context3.sent;
                _context3.next = 8;
                return contract.allowed(user);

              case 8:
                allowed = _context3.sent;
                _context3.next = 11;
                return contract.owner();

              case 11:
                owner = _context3.sent;
                _context3.next = 14;
                return contract.name();

              case 14:
                name = _context3.sent;
                _context3.next = 17;
                return contract.symbol();

              case 17:
                symbol = _context3.sent;


                expect(BASE_URI).to.be.equal(baseURI);
                expect(allowed).to.be.equal(true);
                expect(owner).to.be.equal(deployer);
                expect(name).to.be.equal(contractName);
                expect(symbol).to.be.equal(contractSymbol);

                _context3.next = 25;
                return (0, _collection.setupWearables)(contract);

              case 25:
                _context3.next = 27;
                return contract.wearablesCount();

              case 27:
                wearableLength = _context3.sent;


                expect(wearables.length).to.be.eq.BN(wearableLength);

                i = 0;

              case 30:
                if (!(i < wearableLength)) {
                  _context3.next = 45;
                  break;
                }

                _context3.next = 33;
                return contract.wearables(i);

              case 33:
                wearableId = _context3.sent;
                _context3.next = 36;
                return contract.getWearableKey(wearableId);

              case 36:
                hash = _context3.sent;
                _context3.next = 39;
                return contract.maxIssuance(hash);

              case 39:
                max = _context3.sent;


                expect(wearables[i].name).to.be.equal(wearableId);
                expect(wearables[i].max).to.be.eq.BN(max);

              case 42:
                i++;
                _context3.next = 30;
                break;

              case 45:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      })));
    });

    describe('AddWearable', function () {
      it('should add wearable', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _ref5, logs, totalWearables, wearableId, max;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return contractInstance.addWearable(newWearable1, issuance1);

              case 2:
                _ref5 = _context4.sent;
                logs = _ref5.logs;


                expect(logs.length).to.be.equal(1);
                expect(logs[0].event).to.be.equal('AddWearable');
                expect(logs[0].args._wearableIdKey).to.be.equal(web3.utils.soliditySha3(newWearable1));
                expect(logs[0].args._wearableId).to.be.equal(newWearable1);
                expect(logs[0].args._maxIssuance).to.be.eq.BN(issuance1);

                _context4.next = 11;
                return contractInstance.wearablesCount();

              case 11:
                totalWearables = _context4.sent;
                _context4.next = 14;
                return contractInstance.wearables(totalWearables - 1);

              case 14:
                wearableId = _context4.sent;
                _context4.next = 17;
                return contractInstance.maxIssuance(web3.utils.soliditySha3(wearableId));

              case 17:
                max = _context4.sent;

                expect(newWearable1).to.be.equal(wearableId);
                expect(issuance1).to.be.eq.BN(max);

              case 20:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      })));

      it('should add a long wearable id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _ref7, logs;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return contractInstance.addWearable(newLongWearable1, issuance1);

              case 2:
                _ref7 = _context5.sent;
                logs = _ref7.logs;


                expect(logs.length).to.be.equal(1);
                expect(logs[0].event).to.be.equal('AddWearable');
                expect(logs[0].args._wearableIdKey).to.be.equal(web3.utils.soliditySha3(newLongWearable1));
                expect(logs[0].args._wearableId).to.be.equal(newLongWearable1);
                expect(logs[0].args._maxIssuance).to.be.eq.BN(issuance1);

              case 9:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      })));

      it('reverts if trying to modify an existing wearable', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return (0, _assertRevert2.default)(contractInstance.addWearable(wearables[0].name, 10), 'Can not modify an existing wearable');

              case 2:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      })));

      it('reverts if trying to add wearables with issuance of 0', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return (0, _assertRevert2.default)(contractInstance.addWearable(newWearable1, 0), 'Max issuance should be greater than 0');

              case 2:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      })));

      it('reverts if trying to add wearables by hacker', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return (0, _assertRevert2.default)(contractInstance.addWearable(newWearable1, issuance1, fromHacker), 'Ownable: caller is not the owner');

              case 2:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      })));
    });

    describe('AddWearables', function () {
      it('should add wearables', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _ref12, logs, totalWearables, wearableId, max;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return contractInstance.addWearables([web3.utils.fromAscii(newWearable1), web3.utils.fromAscii(newWearable2)], [issuance1, issuance2]);

              case 2:
                _ref12 = _context9.sent;
                logs = _ref12.logs;


                expect(logs.length).to.be.equal(2);
                expect(logs[0].event).to.be.equal('AddWearable');
                expect(logs[0].args._wearableIdKey).to.be.equal(web3.utils.soliditySha3(newWearable1));
                expect(logs[0].args._wearableId).to.be.equal(newWearable1);
                expect(logs[0].args._maxIssuance).to.be.eq.BN(issuance1);

                expect(logs[1].event).to.be.equal('AddWearable');
                expect(logs[1].args._wearableIdKey).to.be.equal(web3.utils.soliditySha3(newWearable2));
                expect(logs[1].args._wearableId).to.be.equal(newWearable2);
                expect(logs[1].args._maxIssuance).to.be.eq.BN(issuance2);

                _context9.next = 15;
                return contractInstance.wearablesCount();

              case 15:
                totalWearables = _context9.sent;
                _context9.next = 18;
                return contractInstance.wearables(totalWearables - 2);

              case 18:
                wearableId = _context9.sent;
                _context9.next = 21;
                return contractInstance.maxIssuance(web3.utils.soliditySha3(wearableId));

              case 21:
                max = _context9.sent;

                expect(newWearable1).to.be.equal(wearableId);
                expect(issuance1).to.be.eq.BN(max);

                _context9.next = 26;
                return contractInstance.wearables(totalWearables - 1);

              case 26:
                wearableId = _context9.sent;
                _context9.next = 29;
                return contractInstance.maxIssuance(web3.utils.soliditySha3(wearableId));

              case 29:
                max = _context9.sent;

                expect(newWearable2).to.be.equal(wearableId);
                expect(issuance2).to.be.eq.BN(max);

              case 32:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      })));

      it('reverts if trying to modify an existing wearable', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return (0, _assertRevert2.default)(contractInstance.addWearables([web3.utils.fromAscii(wearables[0].name)], [10]), 'Can not modify an existing wearable');

              case 2:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      })));

      it('reverts if trying to add wearables with invalid argument length', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return (0, _assertRevert2.default)(contractInstance.addWearables([web3.utils.fromAscii(wearables[0].name), web3.utils.fromAscii(wearables[1].name)], [10]), 'Parameters should have the same length');

              case 2:
                _context11.next = 4;
                return (0, _assertRevert2.default)(contractInstance.addWearables([web3.utils.fromAscii(wearables[0].name)], [10, 20]), 'Parameters should have the same length');

              case 4:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      })));

      it('reverts if trying to add wearables with issuance of 0', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return (0, _assertRevert2.default)(contractInstance.addWearables([web3.utils.fromAscii(newWearable1), web3.utils.fromAscii(newWearable2)], [0, 10]), 'Max issuance should be greater than 0');

              case 2:
                _context12.next = 4;
                return (0, _assertRevert2.default)(contractInstance.addWearables([web3.utils.fromAscii(newWearable1), web3.utils.fromAscii(newWearable2)], [10, 0]), 'Max issuance should be greater than 0');

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      })));

      it('reverts if trying to add wearables by hacker', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return (0, _assertRevert2.default)(contractInstance.addWearables([web3.utils.fromAscii(newWearable1), web3.utils.fromAscii(newWearable2)], [issuance1, issuance2], fromHacker), 'Ownable: caller is not the owner');

              case 2:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      })));
    });

    describe('TransferBatch', function () {
      it('should transfer in batch', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var ownerToken1, ownerToken2, _ref18, logs;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return contractInstance.ownerOf(token1);

              case 2:
                ownerToken1 = _context14.sent;
                _context14.next = 5;
                return contractInstance.ownerOf(token2);

              case 5:
                ownerToken2 = _context14.sent;

                expect(ownerToken1).to.be.equal(holder);
                expect(ownerToken2).to.be.equal(holder);

                _context14.next = 10;
                return contractInstance.batchTransferFrom(holder, anotherHolder, [token1, token2], fromHolder);

              case 10:
                _ref18 = _context14.sent;
                logs = _ref18.logs;


                expect(logs.length).to.be.equal(2);
                expect(logs[0].event).to.be.equal('Transfer');
                expect(logs[0].args.from).to.be.equal(holder);
                expect(logs[0].args.to).to.be.equal(anotherHolder);
                expect(logs[0].args.tokenId).to.eq.BN(token1);

                expect(logs[1].event).to.be.equal('Transfer');
                expect(logs[1].args.from).to.be.equal(holder);
                expect(logs[1].args.to).to.be.equal(anotherHolder);
                expect(logs[1].args.tokenId).to.eq.BN(token2);

                _context14.next = 23;
                return contractInstance.ownerOf(token1);

              case 23:
                ownerToken1 = _context14.sent;
                _context14.next = 26;
                return contractInstance.ownerOf(token2);

              case 26:
                ownerToken2 = _context14.sent;

                expect(ownerToken1).to.be.equal(anotherHolder);
                expect(ownerToken2).to.be.equal(anotherHolder);

              case 29:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      })));

      it('should safe transfer in batch', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var ownerToken1, ownerToken2, _ref20, logs;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return contractInstance.ownerOf(token1);

              case 2:
                ownerToken1 = _context15.sent;
                _context15.next = 5;
                return contractInstance.ownerOf(token2);

              case 5:
                ownerToken2 = _context15.sent;

                expect(ownerToken1).to.be.equal(holder);
                expect(ownerToken2).to.be.equal(holder);

                _context15.next = 10;
                return contractInstance.safeBatchTransferFrom(holder, anotherHolder, [token1, token2], fromHolder);

              case 10:
                _ref20 = _context15.sent;
                logs = _ref20.logs;


                expect(logs.length).to.be.equal(2);
                expect(logs[0].event).to.be.equal('Transfer');
                expect(logs[0].args.from).to.be.equal(holder);
                expect(logs[0].args.to).to.be.equal(anotherHolder);
                expect(logs[0].args.tokenId).to.eq.BN(token1);

                expect(logs[1].event).to.be.equal('Transfer');
                expect(logs[1].args.from).to.be.equal(holder);
                expect(logs[1].args.to).to.be.equal(anotherHolder);
                expect(logs[1].args.tokenId).to.eq.BN(token2);

                _context15.next = 23;
                return contractInstance.ownerOf(token1);

              case 23:
                ownerToken1 = _context15.sent;
                _context15.next = 26;
                return contractInstance.ownerOf(token2);

              case 26:
                ownerToken2 = _context15.sent;

                expect(ownerToken1).to.be.equal(anotherHolder);
                expect(ownerToken2).to.be.equal(anotherHolder);

              case 29:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      })));

      it('should safe transfer in batch by operator', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var ownerToken1, ownerToken2, _ref22, logs;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return contractInstance.ownerOf(token1);

              case 2:
                ownerToken1 = _context16.sent;
                _context16.next = 5;
                return contractInstance.ownerOf(token2);

              case 5:
                ownerToken2 = _context16.sent;

                expect(ownerToken1).to.be.equal(holder);
                expect(ownerToken2).to.be.equal(holder);

                _context16.next = 10;
                return contractInstance.approve(hacker, token1, fromHolder);

              case 10:
                _context16.next = 12;
                return contractInstance.approve(hacker, token2, fromHolder);

              case 12:
                _context16.next = 14;
                return contractInstance.safeBatchTransferFrom(holder, anotherHolder, [token1, token2], fromHacker);

              case 14:
                _ref22 = _context16.sent;
                logs = _ref22.logs;


                expect(logs.length).to.be.equal(2);
                expect(logs[0].event).to.be.equal('Transfer');
                expect(logs[0].args.from).to.be.equal(holder);
                expect(logs[0].args.to).to.be.equal(anotherHolder);
                expect(logs[0].args.tokenId).to.eq.BN(token1);

                expect(logs[1].event).to.be.equal('Transfer');
                expect(logs[1].args.from).to.be.equal(holder);
                expect(logs[1].args.to).to.be.equal(anotherHolder);
                expect(logs[1].args.tokenId).to.eq.BN(token2);

                _context16.next = 27;
                return contractInstance.ownerOf(token1);

              case 27:
                ownerToken1 = _context16.sent;
                _context16.next = 30;
                return contractInstance.ownerOf(token2);

              case 30:
                ownerToken2 = _context16.sent;

                expect(ownerToken1).to.be.equal(anotherHolder);
                expect(ownerToken2).to.be.equal(anotherHolder);

              case 33:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      })));

      it('should safe transfer in batch by approval for all', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var ownerToken1, ownerToken2, _ref24, logs;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return contractInstance.ownerOf(token1);

              case 2:
                ownerToken1 = _context17.sent;
                _context17.next = 5;
                return contractInstance.ownerOf(token2);

              case 5:
                ownerToken2 = _context17.sent;

                expect(ownerToken1).to.be.equal(holder);
                expect(ownerToken2).to.be.equal(holder);

                _context17.next = 10;
                return contractInstance.setApprovalForAll(hacker, true, fromHolder);

              case 10:
                _context17.next = 12;
                return contractInstance.safeBatchTransferFrom(holder, anotherHolder, [token1, token2], fromHacker);

              case 12:
                _ref24 = _context17.sent;
                logs = _ref24.logs;


                expect(logs.length).to.be.equal(2);
                expect(logs[0].event).to.be.equal('Transfer');
                expect(logs[0].args.from).to.be.equal(holder);
                expect(logs[0].args.to).to.be.equal(anotherHolder);
                expect(logs[0].args.tokenId).to.eq.BN(token1);

                expect(logs[1].event).to.be.equal('Transfer');
                expect(logs[1].args.from).to.be.equal(holder);
                expect(logs[1].args.to).to.be.equal(anotherHolder);
                expect(logs[1].args.tokenId).to.eq.BN(token2);

                _context17.next = 25;
                return contractInstance.ownerOf(token1);

              case 25:
                ownerToken1 = _context17.sent;
                _context17.next = 28;
                return contractInstance.ownerOf(token2);

              case 28:
                ownerToken2 = _context17.sent;

                expect(ownerToken1).to.be.equal(anotherHolder);
                expect(ownerToken2).to.be.equal(anotherHolder);

              case 31:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      })));

      it('reverts when transfer in batch by unuthorized user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var ownerToken1, ownerToken2;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return contractInstance.ownerOf(token1);

              case 2:
                ownerToken1 = _context18.sent;
                _context18.next = 5;
                return contractInstance.ownerOf(token2);

              case 5:
                ownerToken2 = _context18.sent;

                expect(ownerToken1).to.be.equal(holder);
                expect(ownerToken2).to.be.equal(holder);

                _context18.next = 10;
                return (0, _assertRevert2.default)(contractInstance.batchTransferFrom(holder, anotherHolder, [token1, token2], fromHacker), 'ERC721: transfer caller is not owner nor approved');

              case 10:
                _context18.next = 12;
                return (0, _assertRevert2.default)(contractInstance.batchTransferFrom(holder, anotherHolder, [token1, token2, token3], fromHolder), 'ERC721: transfer caller is not owner nor approved');

              case 12:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      })));

      it('reverts when beneficiary is 0 address', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return (0, _assertRevert2.default)(contractInstance.batchTransferFrom(holder, _collection.ZERO_ADDRESS, [token1, token2], fromHolder), 'ERC721: transfer to the zero address');

              case 2:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this);
      })));
    });

    describe('Owner', function () {
      it('should set Allowed user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        var allowed, _ref28, logs;

        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return contractInstance.allowed(user);

              case 2:
                allowed = _context20.sent;

                expect(allowed).to.be.equal(true);

                _context20.next = 6;
                return contractInstance.setAllowed(anotherUser, true, fromDeployer);

              case 6:
                _ref28 = _context20.sent;
                logs = _ref28.logs;


                expect(logs.length).to.be.equal(1);
                expect(logs[0].event).to.be.equal('Allowed');
                expect(logs[0].args._operator).to.be.equal(anotherUser);
                expect(logs[0].args._allowed).to.be.equal(true);

                _context20.next = 14;
                return contractInstance.allowed(anotherUser);

              case 14:
                allowed = _context20.sent;

                expect(allowed).to.be.equal(true);

              case 16:
              case 'end':
                return _context20.stop();
            }
          }
        }, _callee20, this);
      })));

      it('should remove Allowed user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
        var allowed, _ref30, logs;

        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return contractInstance.allowed(user);

              case 2:
                allowed = _context21.sent;

                expect(allowed).to.be.equal(true);

                _context21.next = 6;
                return contractInstance.setAllowed(user, false, fromDeployer);

              case 6:
                _ref30 = _context21.sent;
                logs = _ref30.logs;


                expect(logs.length).to.be.equal(1);
                expect(logs[0].event).to.be.equal('Allowed');
                expect(logs[0].args._operator).to.be.equal(user);
                expect(logs[0].args._allowed).to.be.equal(false);

                _context21.next = 14;
                return contractInstance.allowed(user);

              case 14:
                allowed = _context21.sent;

                expect(allowed).to.be.equal(false);

              case 16:
              case 'end':
                return _context21.stop();
            }
          }
        }, _callee21, this);
      })));

      it('should set Base Uri user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
        var newBaseURI, baseURI, _ref32, logs, uri, wearableId;

        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                newBaseURI = 'https';
                _context22.next = 3;
                return contractInstance.baseURI();

              case 3:
                baseURI = _context22.sent;

                expect(BASE_URI).to.be.equal(baseURI);

                _context22.next = 7;
                return contractInstance.setBaseURI(newBaseURI, fromDeployer);

              case 7:
                _ref32 = _context22.sent;
                logs = _ref32.logs;


                expect(logs.length).to.be.equal(1);
                expect(logs[0].event).to.be.equal('BaseURI');
                expect(logs[0].args._oldBaseURI).to.be.equal(BASE_URI);
                expect(logs[0].args._newBaseURI).to.be.equal(newBaseURI);

                _context22.next = 15;
                return contractInstance.baseURI();

              case 15:
                baseURI = _context22.sent;

                expect(newBaseURI).to.be.equal(baseURI);

                _context22.next = 19;
                return contractInstance.tokenURI(token1);

              case 19:
                uri = _context22.sent;
                wearableId = uri.split('/').pop();


                expect(uri).to.be.equal('' + newBaseURI + wearable0 + '/' + wearableId);

              case 22:
              case 'end':
                return _context22.stop();
            }
          }
        }, _callee22, this);
      })));

      it('reverts when trying to change values by hacker', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return (0, _assertRevert2.default)(contractInstance.setAllowed(user, true, fromHacker), 'Ownable: caller is not the owner');

              case 2:
                _context23.next = 4;
                return (0, _assertRevert2.default)(contractInstance.setBaseURI('', fromHacker), 'Ownable: caller is not the owner');

              case 4:
              case 'end':
                return _context23.stop();
            }
          }
        }, _callee23, this);
      })));

      it('reverts when trying to set an already allowed or not allowed user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return (0, _assertRevert2.default)(contractInstance.setAllowed(user, true, fromDeployer), 'You should set a different value');

              case 2:
                _context24.next = 4;
                return (0, _assertRevert2.default)(contractInstance.setAllowed(anotherUser, false, fromDeployer), 'You should set a different value');

              case 4:
              case 'end':
                return _context24.stop();
            }
          }
        }, _callee24, this);
      })));

      it('reverts when trying to set an already allowed or not allowed user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return (0, _assertRevert2.default)(contractInstance.setAllowed(_collection.ZERO_ADDRESS, true, fromDeployer), 'Invalid address');

              case 2:
              case 'end':
                return _context25.stop();
            }
          }
        }, _callee25, this);
      })));
    });

    describe('Issuances', function () {
      it('should manage wearable', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
        var issued;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return contractInstance.issued(wearable0Hash);

              case 2:
                issued = _context26.sent;

                expect(issued).to.eq.BN(2);

                _context26.next = 6;
                return contractInstance.issued(wearable1Hash);

              case 6:
                issued = _context26.sent;

                expect(issued).to.eq.BN(1);

              case 8:
              case 'end':
                return _context26.stop();
            }
          }
        }, _callee26, this);
      })));

      it('should reach wearable limit', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
        var maxKind, i, issued;
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return contractInstance.maxIssuance(wearable2Hash);

              case 2:
                maxKind = _context27.sent;
                i = 0;

              case 4:
                if (!(i < maxKind.toNumber())) {
                  _context27.next = 10;
                  break;
                }

                _context27.next = 7;
                return issueWearable(contractInstance, holder, 2, fromUser);

              case 7:
                i++;
                _context27.next = 4;
                break;

              case 10:
                _context27.next = 12;
                return contractInstance.issued(wearable2Hash);

              case 12:
                issued = _context27.sent;


                expect(issued).to.eq.BN(maxKind);

              case 14:
              case 'end':
                return _context27.stop();
            }
          }
        }, _callee27, this);
      })));

      it('should be issued with correct wearables and maximum', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref39, name, max, maxKind;

        return regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context28.prev = 3;
                _iterator = wearables[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context28.next = 15;
                  break;
                }

                _ref39 = _step.value;
                name = _ref39.name, max = _ref39.max;
                _context28.next = 10;
                return contractInstance.maxIssuance(web3.utils.soliditySha3(name));

              case 10:
                maxKind = _context28.sent;


                expect(maxKind).to.eq.BN(max);

              case 12:
                _iteratorNormalCompletion = true;
                _context28.next = 5;
                break;

              case 15:
                _context28.next = 21;
                break;

              case 17:
                _context28.prev = 17;
                _context28.t0 = _context28['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context28.t0;

              case 21:
                _context28.prev = 21;
                _context28.prev = 22;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 24:
                _context28.prev = 24;

                if (!_didIteratorError) {
                  _context28.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context28.finish(24);

              case 28:
                return _context28.finish(21);

              case 29:
              case 'end':
                return _context28.stop();
            }
          }
        }, _callee28, this, [[3, 17, 21, 29], [22,, 24, 28]]);
      })));
    });

    describe('URI', function () {
      it('should issue tokens with correct URI', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
        var uri, owner, wearableId;
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return contractInstance.tokenURI(token1);

              case 2:
                uri = _context29.sent;
                _context29.next = 5;
                return contractInstance.ownerOf(token1);

              case 5:
                owner = _context29.sent;
                wearableId = uri.split('/').pop();


                expect(uri).to.be.equal('' + BASE_URI + wearable0 + '/' + wearableId);
                expect(owner).to.be.equal(holder);

              case 9:
              case 'end':
                return _context29.stop();
            }
          }
        }, _callee29, this);
      })));
    });

    describe('completeCollection', function () {
      it('should complete collection', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30() {
        var isComplete, _ref42, logs;

        return regeneratorRuntime.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return contractInstance.isComplete();

              case 2:
                isComplete = _context30.sent;

                expect(isComplete).to.be.equal(false);

                _context30.next = 6;
                return contractInstance.completeCollection();

              case 6:
                _ref42 = _context30.sent;
                logs = _ref42.logs;


                expect(logs.length).to.equal(1);
                expect(logs[0].event).to.equal('Complete');

                _context30.next = 12;
                return contractInstance.isComplete();

              case 12:
                isComplete = _context30.sent;

                expect(isComplete).to.be.equal(true);

              case 14:
              case 'end':
                return _context30.stop();
            }
          }
        }, _callee30, this);
      })));

      it('should issue tokens after complete the collection', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31() {
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return contractInstance.completeCollection();

              case 2:
                _context31.next = 4;
                return issueWearable(contractInstance, holder, 0, fromUser);

              case 4:
                _context31.next = 6;
                return issueWearable(contractInstance, anotherHolder, 0, fromUser);

              case 6:
                _context31.next = 8;
                return issueWearable(contractInstance, anotherHolder, 1, fromUser);

              case 8:
              case 'end':
                return _context31.stop();
            }
          }
        }, _callee31, this);
      })));

      it('reverts when trying to add a wearable after the collection is completed', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32() {
        var isComplete;
        return regeneratorRuntime.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return contractInstance.isComplete();

              case 2:
                isComplete = _context32.sent;

                expect(isComplete).to.be.equal(false);

                _context32.next = 6;
                return contractInstance.addWearable(newWearable1, issuance1);

              case 6:
                _context32.next = 8;
                return contractInstance.completeCollection();

              case 8:
                _context32.next = 10;
                return contractInstance.isComplete();

              case 10:
                isComplete = _context32.sent;

                expect(isComplete).to.be.equal(true);

                _context32.next = 14;
                return (0, _assertRevert2.default)(contractInstance.addWearable(newWearable2, issuance2), 'The collection is complete');

              case 14:
                _context32.next = 16;
                return (0, _assertRevert2.default)(contractInstance.addWearables([web3.utils.fromAscii(newWearable1), web3.utils.fromAscii(newWearable2)], [issuance1, issuance2]), 'The collection is complete');

              case 16:
              case 'end':
                return _context32.stop();
            }
          }
        }, _callee32, this);
      })));

      it('reverts when completing collection twice', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33() {
        return regeneratorRuntime.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return contractInstance.completeCollection();

              case 2:
                _context33.next = 4;
                return (0, _assertRevert2.default)(contractInstance.completeCollection(), 'The collection is already completed');

              case 4:
              case 'end':
                return _context33.stop();
            }
          }
        }, _callee33, this);
      })));

      it('reverts when completing collection by hacker', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34() {
        return regeneratorRuntime.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                _context34.next = 2;
                return contractInstance.completeCollection();

              case 2:
                _context34.next = 4;
                return (0, _assertRevert2.default)(contractInstance.completeCollection(fromUser), 'Ownable: caller is not the owner');

              case 4:
                _context34.next = 6;
                return (0, _assertRevert2.default)(contractInstance.completeCollection(fromHacker), 'Ownable: caller is not the owner');

              case 6:
              case 'end':
                return _context34.stop();
            }
          }
        }, _callee34, this);
      })));
    });
  });
}