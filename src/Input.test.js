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
}

describe("render", () => {
  describe("word has not been guessed", ()=> {
    test("renders componet without error", ()=> {

    })
    test("renders input box", ()=> {

    })
    test("renders submit button", ()=> {

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