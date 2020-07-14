
// import comment from './comment_reducer';
//store가 있는데 reducer들이 여러가지가 있을 수 있음.
//reducer안에서 하는일은 어떻게 state가 변하는걸 보여준다음에 변하는값을 return해줌.
import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user
})

export default rootReducer;