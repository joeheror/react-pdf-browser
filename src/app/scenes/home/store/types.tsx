import { DOCUMENT_DATA, NormalizedObjects } from "../../../types";

export interface HOME_STATE {
  documents: NormalizedObjects<DOCUMENT_DATA>
  lastDocumentId: number
  openedDocumentId: number
}