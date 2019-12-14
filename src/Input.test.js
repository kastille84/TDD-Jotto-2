import React from 'react';
import {shallow} from 'enzyme';

import {findByTestAttr, storeFactory} from '../test/testUtils';

import Input, {UnconnectedInput} from './Input';


//we have to connect our redux store to our component
//in our setup function
//we only pass store as props for our tests, not in real app
//create fresh store for each test (StoreFactory)
const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />).dive().dive();
  return wrapper;
}

describe("render", () => {
  describe("word has not been guessed", ()=> {
    let wrapper;
    beforeEach(()=> {
      const initialState = {success:false}
      wrapper = setup(initialState);
    })

    test("renders componet without error", ()=> {
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1);
    })
    test("renders input box", ()=> {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    })
    test("renders submit button", ()=> {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    })
  })

  describe("word has been guessed", ()=> {
    let wrapper;
    beforeEach(() => {
      const initialState = {success: true}
      wrapper = setup(initialState);
    })
    test("renders component without error", ()=> {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    })
    test("does Not render input box", ()=> {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);

    })
    test("does Not render submit button", ()=> {
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.length).toBe(0 );
    })
  })
})

describe("redux props", () => {
  //for the props in mapStateToProps
  test('has success piece of state as prop', ()=> {
    const success = true; //or false if you want
    const wrapper = setup({success: success});
    //instance gives us the react component, to view it's props
    const successProp =  wrapper.instance().props.success;
    expect(successProp).toBe(success);
  })
  
  //for the prop in mapDispatchToProps
  //**comparing func isn't as easy to do so instead
  //check that guessWord  props
  // 1. Exists
  // 2. Is a function
  test(" 'guessWord' action creator is a function prop", ()=>{
    //we not concerned with state, only action creator so no arg in setup
    const wrapper = setup();
    const guessWordProp =  wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  })
})

describe("'guessWord' action creator call", () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = "train";
  beforeEach(()=> {
    //mock func
    guessWordMock = jest.fn();
    const props = {
      success: false,
      guessWord: guessWordMock
    }
    //wrapper
    wrapper = shallow(<UnconnectedInput {...props} />);
    const submitButton = findByTestAttr(wrapper, "submit-button");
    //add value to inputBox (which is a ref)
    wrapper.instance().inputBox.current = {value: guessedWord}
    //simulate a click
    //*** we need preventDefault, because simulate doens't know of event */
    
    submitButton.simulate("click", { preventDefault(){} });
  })

  test("'guessWord' action creator has been called", () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  })

  test("'guessWord' action creator has been called with correct argument", () => {
    //console.log(guessWordMock.mock.calls);
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  })
})