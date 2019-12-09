import React from 'react';
import {shallow} from 'enzyme';

import {findByTestAttr, storeFactory} from '../test/testUtils';

import Input from './Input';

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
    test("renders component without error", ()=> {

    })
    test("does Not render input box", ()=> {

    })
    test("does Not render submit button", ()=> {

    })
  })
})

describe("updating state", () => {

})