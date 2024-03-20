const initialState = {
    posts: [],
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.payload }

        case 'SET_USER_POSTS' :
            return { ...state , posts : action.payload }
            
        case 'UNSET_POSTS':
            return { posts: null, }
        
        default:
            return state;
    }
}

export default postReducer;