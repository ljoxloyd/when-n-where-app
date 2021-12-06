import './menu-styles.css'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cssTransition, ToastContainer } from 'react-toastify'
import { bindActionCreators } from 'redux'

import ListOfDates from './ListOfDates/ListOfDates'
import DateSelectMenu from './MenuDayPicker/MenuDayPicker'
import { actions as UiActions } from '../../../../Store/slices/ui.slice'
import { freeSchedule, busySchedule } from '../../../../Store/slices/schedule.slice'
import { wrapJSX } from '../../../../Shared/utils'
import Select from '../../../../Store/selectors'
import { withDevFallback } from '../../../HOCs'

const SlideEase = cssTransition({
  enter: 'slide-in',
  exit: 'slide-out',
  appendPosition: true,
})

const ListTitle = wrapJSX(
  <h2 className="text-2xl px-4 py-1 font-bold flex items-end" />
)

const SelectHereButton = wrapJSX(
  <button
    className="text-gray-800 underline text-lg ml-4"
    children="Select days"
  />
)

export default withDevFallback(() => {
  const dispatch = useDispatch()

  const menuIsInFree = useSelector(Select.menuIsInFree)
  const schedule = useSelector(Select.schedule)
  const idInEdit = useSelector(Select.idInEdit)

  const addDate = useCallback(
    bindActionCreators(
      menuIsInFree
        ? freeSchedule.actions.ADD_DATE
        : busySchedule.actions.ADD_DATE,
      dispatch
    ),
    [menuIsInFree]
  )

  const setMenuIsInFree = (bool: boolean) => () =>
    dispatch(UiActions.setMenuIsInFree(bool))

  return (
    <section
      className={` flex flex-col section ${
        menuIsInFree ? 'menu-in-free' : 'menu-in-busy'
      } `}
    >
      <DateSelectMenu onSelect={addDate} />

      <ListTitle className="bg-green-100">
        {'When are you free? '}
        <SelectHereButton onClick={setMenuIsInFree(true)} />
      </ListTitle>
      <ListOfDates
        actions={freeSchedule.actions}
        idInEdit={idInEdit}
        list={schedule.whenFree}
      />

      <ListTitle className="bg-red-100">
        {'When are you busy?'}
        <SelectHereButton onClick={setMenuIsInFree(false)} />
      </ListTitle>
      <ListOfDates
        actions={busySchedule.actions}
        idInEdit={idInEdit}
        list={schedule.whenBusy}
      />

      <ToastContainer
        limit={3}
        autoClose={false}
        draggable
        position="top-left"
        transition={SlideEase}
      />
    </section>
  )
})
