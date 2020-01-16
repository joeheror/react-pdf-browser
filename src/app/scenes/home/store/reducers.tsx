import { HOME_STATE } from "./types"
import { HOME_ACTION_TYPES, ADD_DOCUMENT, OPEN_DOCUMENT } from "./action-types"

const INITIAL_STATE: HOME_STATE = {
  documents: {
    byId: {},
    allIds: [],
  },
  lastDocumentId: 0,
  openedDocumentId: 0
}

const HomeReducer = ( state = INITIAL_STATE, action: HOME_ACTION_TYPES): HOME_STATE => {
  switch( action.type) {
    case ADD_DOCUMENT: {
      let { lastDocumentId, documents } = state

      lastDocumentId = 1 + lastDocumentId

      return {
        ...state,
        documents: {
          byId: Object.assign(
            {},
            documents.byId,
            { [lastDocumentId]: action.payload.document}
          ),
          allIds: [
            ...documents.allIds,
            lastDocumentId
          ]
        },
        lastDocumentId
      }
    }

    case OPEN_DOCUMENT: {
      return {
        ...state,
        openedDocumentId: action.payload.documentId
      }
    }
  }
  return state
}

export default HomeReducer
