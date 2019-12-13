import React from 'react';
import {shallow} from 'enzyme';

import {storeFactory} from '../test/testUtils';
import App from './App';

const setup = (state={}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />).dive().dive();
  //console.log(wrapper.debug())
  return wrapper;
}

describe("redux props", ()=> {
  //success piece of state
  test("has access to 'success' state", ()=> {
    const  success =  true;
    const wrapper = setup({success: success});
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success)
  })

  test("has access to 'secretWord' state", () => {
    const secretWord = "party";
    const wrapper = setup({secretWord: secretWord});
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord)
  })
  // guessedWords piece of state
  test("has 'guessedWords' state", ()=> {
    const guessedWords = [{
      guessedWord: "agile",
      letterMatchCount: 1
    }];
    const wrapper = setup({guessedWords});
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords)
  })

  test(" 'getSecretWord' action creator is a function on the props", ()=> {
    const  wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWordProp;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  })

})
