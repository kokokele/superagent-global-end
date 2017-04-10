'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.beforeSend = beforeSend;
exports.end = end;
exports.beforeStart = beforeStart;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _methods = require('methods');

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* @param callback function(err, res)
*/
/**
* @file superagent 监听全局end
* @author kele
*/
function beforeSend(callback) {
    if (typeof callback !== 'function') return;
    var end = _superagent.Request.prototype.end;
    _superagent.Request.prototype.end = function (cb) {
        callback(this);
        return end.call(this, function (err, res) {
            if (typeof cb !== 'function') {
                return;
            }
            cb(err, res);
        });
    };
}

function end(callback) {
    if (typeof callback !== 'function') return;

    var end = _superagent.Request.prototype.end;

    _superagent.Request.prototype.end = function (cb) {
        return end.call(this, function (err, res) {
            if (typeof cb !== 'function') {
                return;
            }

            if (callback(err, res)) {
                cb(err, res);
            };
        });
    };
}

function beforeStart(callback) {
    if (typeof callback !== 'function') return;

    _methods2.default.forEach(function (m) {
        var old = _superagent2.default[m];
        _superagent2.default[m] = function (api) {
            //callback();
            callback(this);
            var request = old.apply(_superagent2.default, arguments);
            return request;
        };
    });
}

exports.default = _superagent.Request;