/**
* @file superagent 监听全局end
* @author kele 
*/
import {superagent} from 'superagent';

const end = superagent.prototype.end;

/*
* @param callback function(err, res)
*/
export default function globalEnd(callback) {

    if (typeof callback !== 'function') return;

    superagent.prototype.end = function (cb) {
        return end.call(this, function (err, res) {
            if (typeof cb !== 'function') {
                return;
            }

            callback(err, res);
            cb(err, res);
        });
    };
}
