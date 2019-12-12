import moxios from 'moxios';

import {storeFactory} from '../../test/testUtils';
import {getSecretWord} from './';


describe("getSecretWord action creator", ()=> {
  beforeEach(()=> {
    moxios.install();
  })
  afterEach(()=> {
    moxios.uninstall()
  })

  //check that it adds the response word to the state
  test("adds response word to state", ()=> {
    const secretWord = "party";
    const store = storeFactory();

    moxios.wait(()=> {
      //get the last request
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord
      })
    })
    //we are returning a promise, so test will wait
    //to determine if test passes or fails
    return store.dispatch(getSecretWord())
    .then(()=> {
      const newState = store.getState();
      expect(newState.secretWord).toBe(secretWord)
    })
  })

})