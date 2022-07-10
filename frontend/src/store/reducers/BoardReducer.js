const INITIAL_STATE = {
  boards: {},
  currBoard: null,
}

export function BoardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_BOARDS':
      return {
        ...state,
        boards: { ...action.boards }
      }
    case 'SET_BOARD':
      return {
        ...state,
        currBoard: action.board
      }
    case 'ADD_BOARD':
      return {
        ...state,
        boards: { ...state.boards, [action.board._id]: { ...action.board } }
      }
    case 'REMOVE_BOARD':
      const newBoardsObject = { ...state.boards };
      Reflect.deleteProperty(newBoardsObject, action.boardId);

      return {
        ...state,
        boards: newBoardsObject
      }
    case 'UPDATE_BOARD':
      const { updatedBoard } = action
      console.log('updatedBoard', updatedBoard);
      return {
        ...state,
        // baords: state.baords.map(baord => baord._id === updatedBaord._id ? updatedbaord : baord)
        baords: { ...state.baords, [updatedBoard._id]: { ...updatedBoard } }
      }
    default:
      return state
  }
}
