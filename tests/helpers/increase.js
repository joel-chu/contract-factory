'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var increaseBlocks = exports.increaseBlocks = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(n) {
    var _this = this;

    var _loop, i;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(i) {
              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return new Promise(function (resolve, reject) {
                        return web3.currentProvider.send({
                          jsonrpc: '2.0',
                          method: 'evm_mine',
                          id: Date.now() + i
                        }, function (err2, res) {
                          return err2 ? reject(err2) : resolve(res);
                        });
                      });

                    case 2:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _loop, _this);
            });
            i = 0;

          case 2:
            if (!(i < n)) {
              _context2.next = 7;
              break;
            }

            return _context2.delegateYield(_loop(i), 't0', 4);

          case 4:
            i++;
            _context2.next = 2;
            break;

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee, this);
  }));

  return function increaseBlocks(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.increaseTime = increaseTime;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var duration = exports.duration = {
  seconds: function seconds(val) {
    return val;
  },
  minutes: function minutes(val) {
    return val * this.seconds(60);
  },
  hours: function hours(val) {
    return val * this.minutes(60);
  },
  days: function days(val) {
    return val * this.hours(24);
  },
  weeks: function weeks(val) {
    return val * this.days(7);
  },
  years: function years(val) {
    return val * this.days(365);
  }

  // Increases testrpc time by the passed duration in seconds
};function increaseTime(duration) {
  var id = Date.now();

  return new Promise(function (resolve, reject) {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [duration],
      id: id
    }, function (err1) {
      if (err1) return reject(err1);

      web3.currentProvider.sendAsync({
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: id + 1
      }, function (err2, res) {
        return err2 ? reject(err2) : resolve(res);
      });
    });
  });
}