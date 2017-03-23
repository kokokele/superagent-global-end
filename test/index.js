import chai from 'chai';
import {expect} from 'chai';
import sinonChai from 'sinon-chai';

import superagent from 'superagent';
import sinon from 'sinon';
import {end, beforeStart} from '../src/index';

chai.use(sinonChai);

describe('superagent-global', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    })


    it('test beforeStart always called', (done) => {
        expect(beforeStart).to.be.ok;

        const callbackSpy = sandbox.spy();
        beforeStart(callbackSpy);

        superagent.get('http://baidu.com').end((err, res) => {
            done();
        });

        superagent.get('http://163.com').end((err, res) => {
            done();
        });
        // console.log('callbackSpy', callbackSpy);

        expect(callbackSpy).to.have.been.calledTwice;

    });

    it (`test beforeStart  call at first`, (done) => {

        let flag = 0;

        beforeStart(() => {
            flag = 1;
        })

        superagent.get('http://baidu.com').end((err, res) => {
            expect(flag).to.eql(1);
            done();
        });

    });

    it(`test end on return true`, (done) => {
        const callbackSpy = sinon.stub().returns(true);
        end(callbackSpy)

        superagent.get('http://baidu.com').end((err, res) => {

            expect(callbackSpy).to.have.been.called;
            done();
        });
    } );

    it(`test end on return false`, (done) => {
        end(() => {

            setTimeout(()=> {
                done();
            },100);
            return false;
        })

        superagent.get('http://baidu.com').end((err, res) => {
            expect(0).to.eql(1);
            done();
        });
    } )
});
