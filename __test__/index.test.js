import superagent from 'superagent';

import {beforeSend, end, beforeStart} from '../src/index';

const target = 'https://travis-ci.org/';

describe('des test', () => {
    it('it test', () => {
        expect('1').toBe('1');
    });

    it('test beforeSend', done => {

        const fn = jest.fn();

        beforeSend(fn);

        superagent.get(target).end((err, res) => {
            expect(fn).toHaveBeenCalled();
            done();

        });
    });

    it('test beforeStart', done => {
        const fn = jest.fn();

        beforeStart(fn);

         superagent.get(target).end((err, res) => {
             done();
         });

         expect(fn).toHaveBeenCalled();
    });

    it('test end', done => {
        end((err, res) => {
            expect(res).toBeTruthy();
            return true;
        });

        superagent.get(target).end((err, res) => {
            expect(res).toBeTruthy();
            done();
         })
    });
})
