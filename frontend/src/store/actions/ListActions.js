import { listService } from '../../services/list.service'

// Thunk - Action Dispatcher
export function loadLists(filterBy) {
  return async dispatch => {
    const lists = await listService.query(filterBy);
    const action = {
      type: 'SET_LISTS',
      lists
    }
    dispatch(action)
  }
}

export function getListById(listId) {
  return async dispatch => {
    const list = await listService.getListById(listId)
    dispatch({ type: 'SET_LIST', list })
  }
}

export function saveList(list) {
  return async dispatch => {
    const isAdd = !list._id
    const updatedList = await listService.save(list)

    if (isAdd) dispatch({ type: 'ADD_LIST', list: updatedList })
    else dispatch({ type: 'UPDATE_LIST', updatedList })
  }
}

export function removeList(listId) {
  return async dispatch => {
    await listService.remove(listId)
    dispatch({ type: 'REMOVE_LIST', listId })
  }
}
