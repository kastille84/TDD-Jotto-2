import React from 'react';
import {shallow} from 'enzyme';

import {storeFactory} from '../test/testUtils';
import App, {UnconnectedApp} from './App';

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
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  })

  test(" 'getSecretWord' runs on ComponentDidMount", () => {
    //create the mock function
    const getSecretWordMock = jest.fn();
    //lets give it all the props it needs so it wont give prop warnings
    //including our Mock func
    const props = {
      getSecretWord: getSecretWordMock, //important one
      success: false,
      guessedWords: []
    }
    //set up App component with the MOCK func as prop
    const wrapper = shallow(<UnconnectedApp {...props} />);
    //run lifecycle method
    wrapper.instance().componentDidMount();
    //check to see if our mock ran
    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
    expect(getSecretWordCallCount).toBe(1);

  })

})


