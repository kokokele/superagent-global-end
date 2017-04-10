/**
* @file superagent 监听全局end
* @author kele
*/
import superagent, {Request} from 'superagent';
import methods from 'methods';


/*
* @param callback function(err, res)
*/
export function beforeSend(callback) {
	if (typeof callback !== 'function') return;
	const end = Request.prototype.end;
	Request.prototype.end = function (cb) {
		callback.call(this);
		return end.call(this, function (err, res) {
			if (typeof cb !== 'function') {
				return;
			}
			cb(err, res);
		});
	};
}

export function end(callback) {
    if (typeof callback !== 'function') return;

    const end = Request.prototype.end;

    Request.prototype.end = function (cb) {
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

export function beforeStart(callback) {
    if (typeof callback !== 'function') return;

    methods.forEach(m => {
        const old = superagent[m];
        superagent[m] = function(api) {
            callback();
            const request = old.apply(superagent, arguments);
            return request;
        }
    });
}
