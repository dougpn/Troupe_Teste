import { AnyAction } from 'redux'


  interface CounterState {
      isSignout?: boolean,
      userToken?: string,
      isLoading?: boolean,
  }
  const initialState: CounterState = {
    isLoading: true,
    isSignout: false,
    userToken: '',
  }
    
  export default function appReducer(state = initialState, action: AnyAction) {
    switch (action?.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action?.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action?.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
        
  
    default:
      return state
    }
  }