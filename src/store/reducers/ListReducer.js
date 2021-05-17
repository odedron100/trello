const INITIAL_STATE = {
  lists: [],
  currList: null
}

export function listReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'SET_LISTS':
      return {
        ...state,
        lists: action.lists
      }
    case 'SET_LIST':
      return {
        ...state,
        currList: action.list
      }
    case 'ADD_LIST':
      return {
        ...state,
        lists: [...state.lists, action.list]
      }
    case 'REMOVE_LIST':
      return {
        ...state,
        lists: state.lists.filter(list => list._id !== action.listId)
      }
    case 'UPDATE_LIST':
      const { updatedList } = action
      return {
        ...state,
        lists: state.lists.map(list => list._id === updatedList._id ? updatedList : list)
      }
    default:
      return state
  }
}
