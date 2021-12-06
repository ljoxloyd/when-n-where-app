import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import MainPage from './MainPage'
import { Provider } from 'react-redux'
import store from '../../../Store/store'

afterEach(cleanup)

describe('Main page', () => {
  it('should render', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    )

    const main = document.querySelector('main')

    expect(main).toBeTruthy()
  })
})
