import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { IScheduleItem, ScheduleActions } from '../../../../../Store/slices/schedule.slice'
import ScheduleItem from "./ScheduleItem/ScheduleItem"
import { withDevFallback } from '../../../../HOCs'


type ListProps = {
  list: IScheduleItem[]
  idInEdit: string | null
  actions: ScheduleActions
}

const ListOfDates = ({ list, idInEdit, actions }: ListProps) =>
  <div className="flex px-2 mb-2 flex-col-reverse">
    <AnimatePresence initial={false} presenceAffectsLayout>
      {list.map((item, index) =>
        <ScheduleItem
          key={item.id}
          actions={actions}
          item={item}
          index={index}
          isInEdit={idInEdit === item.id}
        />
      )}
    </AnimatePresence>
  </div>

export default withDevFallback(ListOfDates)
