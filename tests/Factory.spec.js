'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _assertRevert = require('./helpers/assertRevert');

var _assertRevert2 = _interopRequireDefault(_assertRevert);

var _collection = require('./helpers/collection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ProxyRegistry = artifacts.require('ProxyRegistry');
var ERC721CollectionFactory = artifacts.require('DummyERC721CollectionFactory');

describe('Factory', function () {
  // Contract
  var name = 'Factory';
  var symbol = 'FCTR';

  var erc721Contract = void 0;
  var proxyRegistry = void 0;
  var factoryContract = void 0;

  // Options
  var optionId0 = 0;

  // Accounts
  var accounts = void 0;
  var deployer = void 0;
  var user = void 0;
  var factoryOwner = void 0;
  var factoryOwnerProxy = void 0;
  var hacker = void 0;
  var holder = void 0;
  var fromUser = void 0;
  var fromHacker = void 0;
  var fromFactoryOwner = void 0;
  var fromFactoryOwnerProxy = void 0;
  var fromDeployer = void 0;

  var creationParams = void 0;

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
            factoryOwner = accounts[3];
            hacker = accounts[4];
            factoryOwnerProxy = accounts[5];

            fromFactoryOwner = { from: factoryOwner };
            fromUser = { from: user };
            fromHacker = { from: hacker };
            fromFactoryOwnerProxy = { from: factoryOwnerProxy };

            fromDeployer = { from: deployer };

            creationParams = _extends({}, fromDeployer, {
              gas: 6e6,
              gasPrice: 21e9
            });

            _context.next = 17;
            return ProxyRegistry.new();

          case 17:
            proxyRegistry = _context.sent;

            proxyRegistry.setProxy(factoryOwnerProxy, fromFactoryOwner);

            _context.next = 21;
            return (0, _collection.createDummyCollection)({
              allowed: user,
              creationParams: creationParams
            });

          case 21:
            erc721Contract = _context.sent;
            _context.next = 24;
            return ERC721CollectionFactory.new(name, symbol, _collection.BASE_URI, proxyRegistry.address, erc721Contract.address, fromFactoryOwner);

          case 24:
            factoryContract = _context.sent;
            _context.next = 27;
            return erc721Contract.setAllowed(factoryContract.address, true);

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })));

  describe('create factory', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            it('deploy with correct values', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var contract, _name, _symbol, _baseURI, owner, proxyRegistryContract, collectionContract, optionsCount;

              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return ERC721CollectionFactory.new(name, symbol, _collection.BASE_URI, proxyRegistry.address, erc721Contract.address, fromFactoryOwner);

                    case 2:
                      contract = _context2.sent;
                      _context2.next = 5;
                      return contract.name();

                    case 5:
                      _name = _context2.sent;
                      _context2.next = 8;
                      return contract.symbol();

                    case 8:
                      _symbol = _context2.sent;
                      _context2.next = 11;
                      return contract.baseURI();

                    case 11:
                      _baseURI = _context2.sent;
                      _context2.next = 14;
                      return contract.owner();

                    case 14:
                      owner = _context2.sent;
                      _context2.next = 17;
                      return contract.proxyRegistry();

                    case 17:
                      proxyRegistryContract = _context2.sent;
                      _context2.next = 20;
                      return contract.erc721Collection();

                    case 20:
                      collectionContract = _context2.sent;
                      _context2.next = 23;
                      return contract.numOptions();

                    case 23:
                      optionsCount = _context2.sent;


                      expect(_name).to.be.equal(name);
                      expect(_symbol).to.be.equal(symbol);
                      expect(_baseURI).to.be.equal(_collection.BASE_URI);
                      expect(owner).to.be.equal(factoryOwner);
                      expect(proxyRegistryContract).to.be.equal(proxyRegistry.address);
                      expect(collectionContract).to.be.equal(erc721Contract.address);
                      expect(optionsCount).to.be.eq.BN(_collection.WEARABLES.length);

                    case 31:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            })));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));

  describe('mint', function () {
    it('should mint', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var wearableId, hash, issued, balanceOfHolder, _ref5, logs, totalSupply;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return erc721Contract.wearables(optionId0);

            case 2:
              wearableId = _context4.sent;
              _context4.next = 5;
              return erc721Contract.getWearableKey(wearableId);

            case 5:
              hash = _context4.sent;
              _context4.next = 8;
              return erc721Contract.issued(hash);

            case 8:
              issued = _context4.sent;
              _context4.next = 11;
              return erc721Contract.balanceOf(holder);

            case 11:
              balanceOfHolder = _context4.sent;


              expect(wearableId).to.be.equal(_collection.WEARABLES[optionId0].name);
              expect(issued).to.be.eq.BN(0);
              expect(balanceOfHolder).to.be.eq.BN(0);

              _context4.next = 17;
              return factoryContract.mint(optionId0, holder, fromFactoryOwnerProxy);

            case 17:
              _ref5 = _context4.sent;
              logs = _ref5.logs;
              _context4.next = 21;
              return erc721Contract.totalSupply();

            case 21:
              totalSupply = _context4.sent;
              _context4.next = 24;
              return erc721Contract.issued(hash);

            case 24:
              issued = _context4.sent;


              expect(logs.length).to.be.equal(1);
              expect(logs[0].event).to.be.equal('Issue');
              expect(logs[0].args._beneficiary).to.be.equal(holder);
              expect(logs[0].args._tokenId).to.be.eq.BN(totalSupply.toNumber() - 1);
              expect(logs[0].args._wearableIdKey).to.be.equal(hash);
              expect(logs[0].args._wearableId).to.be.equal(_collection.WEARABLES[optionId0].name);
              expect(logs[0].args._issuedId).to.eq.BN(issued);

              expect(issued).to.be.eq.BN(1);
              _context4.next = 35;
              return erc721Contract.balanceOf(holder);

            case 35:
              balanceOfHolder = _context4.sent;

              expect(balanceOfHolder).to.be.eq.BN(1);

            case 37:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));

    it('reverts when minting by an allowed address', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _assertRevert2.default)(factoryContract.mint(optionId0, holder, fromHacker), 'Only `allowed` proxy can issue tokens');

            case 2:
              _context5.next = 4;
              return (0, _assertRevert2.default)(factoryContract.mint(optionId0, holder, fromFactoryOwner), 'Only `allowed` proxy can issue tokens');

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));

    it('reverts when minting an invalid option', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var optionsCount;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return factoryContract.numOptions();

            case 2:
              optionsCount = _context6.sent;
              _context6.next = 5;
              return (0, _assertRevert2.default)(factoryContract.mint(optionsCount, holder, fromFactoryOwnerProxy), 'Invalid wearable');

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));

    it('reverts when minting an exhausted option', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var wearableId, hash, maxKind, canMint, i;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return erc721Contract.wearables(optionId0);

            case 2:
              wearableId = _context7.sent;
              _context7.next = 5;
              return erc721Contract.getWearableKey(wearableId);

            case 5:
              hash = _context7.sent;
              _context7.next = 8;
              return erc721Contract.maxIssuance(hash);

            case 8:
              maxKind = _context7.sent;
              _context7.next = 11;
              return factoryContract.canMint(optionId0);

            case 11:
              canMint = _context7.sent;

              expect(canMint).to.be.equal(true);

              i = 0;

            case 14:
              if (!(i < maxKind.toNumber())) {
                _context7.next = 20;
                break;
              }

              _context7.next = 17;
              return erc721Contract.issueToken(holder, wearableId, fromUser);

            case 17:
              i++;
              _context7.next = 14;
              break;

            case 20:
              _context7.next = 22;
              return (0, _assertRevert2.default)(factoryContract.mint(optionId0, holder, fromFactoryOwnerProxy), 'Exhausted wearable');

            case 22:
              _context7.next = 24;
              return factoryContract.canMint(optionId0);

            case 24:
              canMint = _context7.sent;

              expect(canMint).to.be.equal(false);

            case 26:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    })));

    it('reverts when querying if an option can be minted', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _assertRevert2.default)(factoryContract.canMint(optionId0 - 1));

            case 2:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    })));
  });

  describe('transferFrom', function () {
    it('should transferFrom', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var wearableId, hash, issued, balanceOfHolder, _ref11, logs, totalSupply;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return erc721Contract.wearables(optionId0);

            case 2:
              wearableId = _context9.sent;
              _context9.next = 5;
              return erc721Contract.getWearableKey(wearableId);

            case 5:
              hash = _context9.sent;
              _context9.next = 8;
              return erc721Contract.issued(hash);

            case 8:
              issued = _context9.sent;
              _context9.next = 11;
              return erc721Contract.balanceOf(holder);

            case 11:
              balanceOfHolder = _context9.sent;


              expect(wearableId).to.be.equal(_collection.WEARABLES[optionId0].name);
              expect(issued).to.be.eq.BN(0);
              expect(balanceOfHolder).to.be.eq.BN(0);

              _context9.next = 17;
              return factoryContract.transferFrom(hacker, holder, optionId0, fromFactoryOwnerProxy);

            case 17:
              _ref11 = _context9.sent;
              logs = _ref11.logs;
              _context9.next = 21;
              return erc721Contract.totalSupply();

            case 21:
              totalSupply = _context9.sent;
              _context9.next = 24;
              return erc721Contract.issued(hash);

            case 24:
              issued = _context9.sent;


              expect(logs.length).to.be.equal(1);
              expect(logs[0].event).to.be.equal('Issue');
              expect(logs[0].args._beneficiary).to.be.equal(holder);
              expect(logs[0].args._tokenId).to.be.eq.BN(totalSupply.toNumber() - 1);
              expect(logs[0].args._wearableIdKey).to.be.equal(hash);
              expect(logs[0].args._wearableId).to.be.equal(_collection.WEARABLES[optionId0].name);
              expect(logs[0].args._issuedId).to.eq.BN(issued);

              expect(issued).to.be.eq.BN(1);
              _context9.next = 35;
              return erc721Contract.balanceOf(holder);

            case 35:
              balanceOfHolder = _context9.sent;

              expect(balanceOfHolder).to.be.eq.BN(1);

            case 37:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    })));

    it('reverts when transferFrom by an allowed address', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return (0, _assertRevert2.default)(factoryContract.transferFrom(hacker, holder, optionId0, fromHacker), 'Only `allowed` proxy can issue tokens');

            case 2:
              _context10.next = 4;
              return (0, _assertRevert2.default)(factoryContract.transferFrom(hacker, holder, optionId0, fromFactoryOwner), 'Only `allowed` proxy can issue tokens');

            case 4:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    })));

    it('reverts when transferFrom an invalid option', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      var optionsCount;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return factoryContract.numOptions();

            case 2:
              optionsCount = _context11.sent;
              _context11.next = 5;
              return (0, _assertRevert2.default)(factoryContract.transferFrom(hacker, holder, optionsCount, fromFactoryOwnerProxy), 'Invalid wearable');

            case 5:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this);
    })));

    it('reverts when transferFrom an exhausted option', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var wearableId, hash, maxKind, canMint, i;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return erc721Contract.wearables(optionId0);

            case 2:
              wearableId = _context12.sent;
              _context12.next = 5;
              return erc721Contract.getWearableKey(wearableId);

            case 5:
              hash = _context12.sent;
              _context12.next = 8;
              return erc721Contract.maxIssuance(hash);

            case 8:
              maxKind = _context12.sent;
              _context12.next = 11;
              return factoryContract.canMint(optionId0);

            case 11:
              canMint = _context12.sent;

              expect(canMint).to.be.equal(true);

              i = 0;

            case 14:
              if (!(i < maxKind.toNumber())) {
                _context12.next = 20;
                break;
              }

              _context12.next = 17;
              return erc721Contract.issueToken(holder, wearableId, fromUser);

            case 17:
              i++;
              _context12.next = 14;
              break;

            case 20:
              _context12.next = 22;
              return (0, _assertRevert2.default)(factoryContract.transferFrom(hacker, holder, optionId0, fromFactoryOwnerProxy), 'Exhausted wearable');

            case 22:
              _context12.next = 24;
              return factoryContract.canMint(optionId0);

            case 24:
              canMint = _context12.sent;

              expect(canMint).to.be.equal(false);

            case 26:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, this);
    })));
  });

  describe('Owner', function () {
    it('should set Base URI', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      var newBaseURI, _baseURI, _ref16, logs, wearableId, uri;

      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              newBaseURI = 'https';
              _context13.next = 3;
              return factoryContract.baseURI();

            case 3:
              _baseURI = _context13.sent;

              expect(_baseURI).to.be.equal(_collection.BASE_URI);

              _context13.next = 7;
              return factoryContract.setBaseURI(newBaseURI, fromFactoryOwner);

            case 7:
              _ref16 = _context13.sent;
              logs = _ref16.logs;


              expect(logs.length).to.be.equal(1);
              expect(logs[0].event).to.be.equal('BaseURI');
              expect(logs[0].args._oldBaseURI).to.be.equal(_baseURI);
              expect(logs[0].args._newBaseURI).to.be.equal(newBaseURI);

              _context13.next = 15;
              return erc721Contract.wearables(optionId0);

            case 15:
              wearableId = _context13.sent;
              _context13.next = 18;
              return factoryContract.tokenURI(optionId0);

            case 18:
              uri = _context13.sent;
              _context13.next = 21;
              return factoryContract.baseURI();

            case 21:
              _baseURI = _context13.sent;


              expect(_baseURI).to.be.equal(newBaseURI);
              expect(wearableId).to.be.equal(_collection.WEARABLES[optionId0].name);
              expect(uri).to.be.equal(newBaseURI + _collection.WEARABLES[optionId0].name);

            case 25:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, this);
    })));

    it('reverts when trying to change values by hacker', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return (0, _assertRevert2.default)(factoryContract.setBaseURI('', fromHacker), 'Ownable: caller is not the owner');

            case 2:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, this);
    })));
  });

  describe('approval', function () {
    it('should return valid isApprovedForAll', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
      var isApprovedForAll;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return factoryContract.isApprovedForAll(factoryOwner, factoryOwner);

            case 2:
              isApprovedForAll = _context15.sent;

              expect(isApprovedForAll).to.be.equal(true);

              _context15.next = 6;
              return factoryContract.isApprovedForAll(factoryOwner, factoryOwnerProxy);

            case 6:
              isApprovedForAll = _context15.sent;

              expect(isApprovedForAll).to.be.equal(true);

              _context15.next = 10;
              return factoryContract.isApprovedForAll(user, factoryOwner);

            case 10:
              isApprovedForAll = _context15.sent;

              expect(isApprovedForAll).to.be.equal(false);

              _context15.next = 14;
              return factoryContract.isApprovedForAll(hacker, user);

            case 14:
              isApprovedForAll = _context15.sent;

              expect(isApprovedForAll).to.be.equal(false);

            case 16:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, this);
    })));
  });

  describe('balanceOf', function () {
    it('should return balance of options', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
      var optionsCount, i, _balance, wearableId, hash, balance, issued;

      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return factoryContract.numOptions();

            case 2:
              optionsCount = _context16.sent;
              i = 0;

            case 4:
              if (!(i < optionsCount.toNumber())) {
                _context16.next = 12;
                break;
              }

              _context16.next = 7;
              return factoryContract.balanceOf(i);

            case 7:
              _balance = _context16.sent;

              expect(_balance).to.be.eq.BN(_collection.WEARABLES[i].max);

            case 9:
              i++;
              _context16.next = 4;
              break;

            case 12:
              _context16.next = 14;
              return erc721Contract.wearables(optionId0);

            case 14:
              wearableId = _context16.sent;
              _context16.next = 17;
              return erc721Contract.issueToken(holder, wearableId, fromUser);

            case 17:
              _context16.next = 19;
              return erc721Contract.getWearableKey(wearableId);

            case 19:
              hash = _context16.sent;
              _context16.next = 22;
              return factoryContract.balanceOf(optionId0);

            case 22:
              balance = _context16.sent;
              _context16.next = 25;
              return erc721Contract.issued(hash);

            case 25:
              _context16.next = 27;
              return _context16.sent;

            case 27:
              issued = _context16.sent;

              expect(balance).to.be.eq.BN(_collection.WEARABLES[optionId0].max - issued.toNumber());

            case 29:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, this);
    })));

    it('reverts for an invalid option', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return (0, _assertRevert2.default)(factoryContract.balanceOf(optionId0 - 1));

            case 2:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, this);
    })));
  });

  describe('proxies', function () {
    it('should return proxy count', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
      var proxy;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return factoryContract.proxies(factoryOwner);

            case 2:
              proxy = _context18.sent;

              expect(proxy).to.be.equal(factoryOwnerProxy);

            case 4:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, this);
    })));
  });

  describe('numOptions', function () {
    it('should return options count', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
      var optionsCount;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return factoryContract.numOptions();

            case 2:
              optionsCount = _context19.sent;

              expect(optionsCount).to.be.eq.BN(_collection.WEARABLES.length);

            case 4:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, this);
    })));
  });

  describe('supportsFactoryInterface', function () {
    it('should return support factory interface', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
      var supported;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return factoryContract.supportsFactoryInterface();

            case 2:
              supported = _context20.sent;

              expect(supported).to.be.equal(true);

            case 4:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, this);
    })));
  });

  describe('ownerOf', function () {
    it('should return owner of options', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
      var wearablesCount, i, owner;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return erc721Contract.wearablesCount();

            case 2:
              wearablesCount = _context21.sent;
              i = 0;

            case 4:
              if (!(i < wearablesCount.toNumber())) {
                _context21.next = 12;
                break;
              }

              _context21.next = 7;
              return factoryContract.ownerOf(i);

            case 7:
              owner = _context21.sent;

              expect(owner).to.be.equal(factoryOwner);

            case 9:
              i++;
              _context21.next = 4;
              break;

            case 12:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, this);
    })));

    it('should return the owner event if the option is invalid', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
      var owner;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return factoryContract.ownerOf(-1);

            case 2:
              owner = _context22.sent;

              expect(owner).to.be.equal(factoryOwner);

            case 4:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, this);
    })));
  });
});