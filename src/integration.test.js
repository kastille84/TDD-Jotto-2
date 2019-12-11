import {storeFactory} from '../test/testUtils';
import { guessWord} from './actions';

describe("guessWord action dispatcher", ()=> {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';

  describe("no guessed words", ()=> {
    let store;
    const initialState = {secretWord: secretWord};
    beforeEach(()=> {
      store = storeFactory(initialState);
    })

    test("updated state correctly for Unsuccessful guess", ()=> {
      //dispatch the action creator
      store.dispatch(guessWord(unsuccessfulGuess));
      //the state after the dispatch has run
      const newState = store.getState()
      //what we think the state will be
      const expectedState = {
        ...initialState, 
        success: false,
        guessedWords: [{
          guessedWord: unsuccessfulGuess,
          letterMatchCount: 3
        }]
      }
      //check if the new state we get is the same as expected state
      expect(newState).toEqual(expectedState);
    })
    test("updated state correctly for Successful guess", ()=> {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [{
          guessedWord: secretWord,
          letterMatchCount: 5
        }]
      }

      expect(newState).toEqual(expectedState);
    })
  })

  describe("some guessed words", ()=> {
    let store;
    const guessedWords = [
      {guessedWord: "agile", letterMatchCount:1}
    ]
    const initialState = {
      secretWord: "party",
      guessedWords: guessedWords
    }
    beforeEach(()=> {
      store = storeFactory(initialState);
    })

    test("updated state correctly for Unsuccessful guess", ()=> {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: false,
        guessedWords: [...guessedWords, {guessedWord: unsuccessfulGuess, letterMatchCount: 3}]
      }
      expect(newState).toEqual(expectedState);
    })
    test("updated state correctly for Successful guess", ()=> {
      store.dispatch(guessWord(secretWord));
      const newState  = store.getState();
      const expectedState = {
        secretWord,
        success: true,
        guessedWords: [...guessedWords, {guessedWord: secretWord, letterMatchCount: 5}]
      }
      expect(newState).toEqual(expectedState);
    })
  })
})