import {end, beforeStart} from '../src/index';
import superagent from 'superagent';


fixture `test superagent-global`

const url = 'http://www.baidu.com';

let $res;

let step = 0;
let beforeKey = 0;

test
    .before(async t => {

        await beforeStart(() => {
            console.log('beforeStart');
            beforeKey = 1;
        });

        await end((err, res) => {
            console.log('end');
            if (beforeKey == 0) beforeKey = 2;
            $res = res;
        });

        console.log('send');

        await superagent.post(url).send()


    })
    ('test end', async t => {
        await t.expect($res.status).eql(200);
        await t.expect(beforeKey).eql(1);
    });
