/**
* @file superagent 监听全局end
* @author kele
*/
import {Request} from 'superagent';

const end = Request.prototype.end;

/*
* @param callback function(err, res)
*/
export default function globalEnd(callback) {

    if (typeof callback !== 'function') return;

    Request.prototype.end = function (cb) {
        return end.call(this, function (err, res) {
            if (typeof cb !== 'function') {
                return;
            }

            callback(err, res);
            cb(err, res);
        });
    };
}
