// noinspection SpellCheckingInspection

import React, { ComponentProps } from 'react'
import { is, Struct } from 'superstruct'
import { PayloadAction } from '@reduxjs/toolkit'
import { ReduxTable } from './types'


//===========================================================================//
//wrapJSX
/**
 * allows to create component from single JSX block
 */
export const wrapJSX = <C extends keyof JSX.IntrinsicElements = 'div'>(
  elem: JSX.Element
) =>
  React.forwardRef(({ className, ...props }: ComponentProps<C>, ref) =>
    React.cloneElement(elem, {
      ...props,
      className: `${elem.props.className} ${className ?? ''}`,
      ref,
    })
  )

//===========================================================================//
//retrieveFromLS
/**
 *  @param {string} key
 *  @returns value of key from localStorage
 */
export function getFromLS(key: string): unknown {
  return JSON.parse(localStorage.getItem(key) ?? 'null')
}

//===========================================================================//
//retrieveFromLS
/**
 *  @param {string} key
 *  @param {any} data
 *  @returns value of key from localStorage
 */
export function putToLs(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
}

//===========================================================================//
//validater
/**
 *  Curried function that takes schema and than data to validate

 *  @returns data if it's valid or null
 * @param schema
 */
export function validate<T>(schema: Struct<T>) {
  return (data: unknown) => (is(data, schema) ? data : null)
}

//===========================================================================//
export function getStateFromLS<T>({
  key,
  schema,
  fallback,
}: {
  key: string
  schema: Struct<T>
  fallback: T
}): T {
  return pipe(getFromLS, validate(schema), (state) => state ?? fallback)(key)
}

//===========================================================================//
/**
 * Helper generic function factory.
 * Returns a function that creates a reducer for state T that sets an F field in state
 */
export const makeSetterFor =
  <T extends {}>() =>
  <F extends keyof T>(field: F) =>
  (state: T, action: PayloadAction<T[F]>) => {
    state[field] = action.payload
  }

//===========================================================================//
/**
 * Wrapper for normalazied redux state
 */
export const Table = <T extends { id: string }>(
  table: ReduxTable<T> = { byId: {}, allIds: [] }
) => ({
  add(item: T) {
    table.byId[item.id] = item
    table.allIds.push(item.id)
    return this
  },

  remove(id: string) {
    delete table.byId[id]
    table.allIds.splice(
      table.allIds.findIndex((itemId) => id === itemId),
      1
    )
    return this
  },

  edit(id: string, fn: (item: T) => void) {
    fn(table.byId[id])
    return this
  },

  unwrap: () => table,
})


//===========================================================================//
//range
/**
 * works similar to [...Array(n).keys()] but can create ranges from [start] to [stop] with [step]
 * and works 40% faster
 * @returns {number[]} array of numbers from 0 to [stop]
 */
 export function range(...args: number[]) {
    const options = [
      { start: 0, stop: args[0], step: 1 },
      { start: args[0], stop: args[1], step: 1 },
      { start: args[0], stop: args[1], step: args[2] },
    ]
    let { start, stop, step } = options[args.length - 1]

    const array: number[] = []
    const length = Math.ceil((stop - start) / step)

    let i = -1
    while (++i < length) {
      array[i] = start
      start += step
    }
    return array
  }

  //===========================================================================//
  type F<A, B> = (a: A) => B

  export function pipe<A, B, Z>(f1: F<A, B>, f2: F<B, Z>): (a: A) => Z
  export function pipe<A, B, C, Z>(f1: F<A, B>, f2: F<B, C>, f3: F<C, Z>): (a: A) => Z
  export function pipe<A, B, C, D, Z>(
    f1: F<A, B>,
    f2: F<B, C>,
    f3: F<C, D>,
    f4: F<D, Z>
  ): (a: A) => Z
  export function pipe<A, B, C, D, E, Z>(
    f1: F<A, B>,
    f2: F<B, C>,
    f3: F<C, D>,
    f4: F<D, E>,
    f5: F<E, Z>
  ): (a: A) => Z
  /**
   * Function composition tool
   *
   * Can combine up to 5 functions, if needed more - type system will need
   * more overloads, no way around it, at least it's better than what redux provides
   */
  export function pipe(...funcs: Function[]) {
    return funcs.reduce(
      (f1, f2) =>
        (...args: any) =>
          f2(f1(...args))
    )
  }

  //===========================================================================//
  /**
   * Throws passed message. Userfull when need to throw but as an expression
   *  */
  export const throwErr = (msg: string) => {
    throw msg
  }
