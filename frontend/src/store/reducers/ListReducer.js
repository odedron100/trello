const INITIAL_STATE = {
  lists: {},
  currList: null,
}

export function listReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LISTS':
      return {
        ...state,
        lists: { ...action.lists }
      }
    case 'SET_LIST':
      return {
        ...state,
        currList: action.list
      }
    case 'ADD_LIST':
      return {
        ...state,
        lists: { ...state.lists, [action.list._id]: { ...action.list } }
      }
    case 'REMOVE_LIST':
      const newListsObject = { ...state.lists };
      Reflect.deleteProperty(newListsObject, action.listId);

      return {
        ...state,
        lists: newListsObject
      }
    case 'UPDATE_LIST':
      const { updatedList } = action
      return {
        ...state,
        // lists: state.lists.map(list => list._id === updatedList._id ? updatedList : list)
        lists: { ...state.lists, [updatedList._id]: { ...updatedList } }
      }
    default:
      return state
  }
}
