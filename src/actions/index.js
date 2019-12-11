import {getLetterMatchCount} from '../helpers'

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: "GUESS_WORD",
}

export const guessWord = (guessedWord) => {
  return function(dispatch, getState) {
    //get the secret word
    const secretWord = getState().secretWord;
    const letterMatchCount =  getLetterMatchCount(guessedWord, secretWord);

    //dispatch a Guess words action
    dispatch({
      type: actionTypes.GUESS_WORD, 
      payload: {guessedWord, letterMatchCount: letterMatchCount}
    })
    //on dispatch this if words match
    if (guessedWord === secretWord){
      dispatch({
        type: actionTypes.CORRECT_GUESS
      })
    }
  };
}
