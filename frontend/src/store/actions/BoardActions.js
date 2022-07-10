import { boardService } from '../../services/board.service'

// Thunk - Action Dispatcher
export function loadBoards(filterBy) {
  return async dispatch => {
    const boards = await boardService.query(filterBy);
    const action = {
      type: 'SET_BOARDS',
      boards
    }
    dispatch(action)
  }
}

export function getBoardById(boardId) {
  return async dispatch => {
    const board = await boardService.getById(boardId)
    dispatch({ type: 'SET_BOARD', board })
  }
}

export function saveBoard(board) {
  return async dispatch => {
    const isAdd = !board._id
    const updatedBoard = await boardService.save(board)

    if (isAdd) dispatch({ type: 'ADD_BOARD', board: updatedBoard })
    else dispatch({ type: 'UPDATE_BOARD', updatedBoard })
  }
}

export function removeboard(boardId) {
  return async dispatch => {
    await boardService.remove(boardId)
    dispatch({ type: 'REMOVE_BOARD', boardId })
  }
}
