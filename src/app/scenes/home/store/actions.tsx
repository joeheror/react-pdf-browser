import { DOCUMENT_DATA } from "../../../types";
import { HOME_ACTION_TYPES, ADD_DOCUMENT, OPEN_DOCUMENT } from "./action-types";

export function addDocument(document: DOCUMENT_DATA): HOME_ACTION_TYPES {
  return {
    type: ADD_DOCUMENT,
    payload: {
      document
    }
  }
}

export function openDocument( documentId: number): HOME_ACTION_TYPES {
  return {
    type: OPEN_DOCUMENT,
    payload: {
      documentId
    }
  }
}