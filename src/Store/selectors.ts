import { Root } from './store'

//prettier-ignore
const Select = {
  currentUser:  (state: Root) => state.auth.user
  ,
  idInEdit:     (state: Root) => state.ui.idInEdit
  ,
  menuIsInFree: (state: Root) => state.ui.menuIsInFree
  ,
  schedule:     (state: Root) => state.currentEvent.schedule
  ,
  places:       (state: Root) => state.currentEvent.places.allIds.map(id => state.currentEvent.places.byId[id])
  ,
  user:         (state: Root) => state.auth.user
}

export default Select
