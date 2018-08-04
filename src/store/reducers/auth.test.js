import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            userId: null,
            tokenId: null,
            loading: false,
            error: null,
            redirectPath: '/'
        });
    });


    it('should reflect the correct tokenId and userId', () => {
        expect(reducer({
            userId: 'some-user-id',
            tokenId: 'some-token-id',
            loading: false,
            error: null,
            redirectPath: '/'
        }, actionTypes.AUTH_SUCCESS)).toEqual({
            userId: 'some-user-id!',
            tokenId: 'some-token-id',
            loading: false,
            error: null,
            redirectPath: '/'
        })
    })
});