import './Assets/global.css'
import './Assets/tailwind.css'
import './Assets/custom-elements.ts'
import 'react-toastify/dist/ReactToastify.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App'

import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import isoWeek from 'dayjs/plugin/isoWeek'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(localeData)
dayjs.extend(isoWeek)
dayjs.extend(isBetween)

ReactDOM.render(<App />, document.getElementById('root'))
