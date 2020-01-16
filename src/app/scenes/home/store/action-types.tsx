import { DOCUMENT_DATA } from "../../../types"

export const ADD_DOCUMENT = 'ADD_DOCUMENT'
export const OPEN_DOCUMENT = 'OPEN_DOCUMENT'

export interface ADD_DOCUMENT_ACTION {
  type: typeof ADD_DOCUMENT,
  payload: {
    document: DOCUMENT_DATA,
  }
}

export interface OPEN_DOCUMENT_ACTION {
  type: typeof OPEN_DOCUMENT,
  payload: {
    documentId: number,
  }
}

export type HOME_ACTION_TYPES = 
  ADD_DOCUMENT_ACTION |
  OPEN_DOCUMENT_ACTION