export interface NormalizedObjects<T> {
  byId: { [id: number]: T }
  allIds: number[]
}

export interface DOCUMENT_DATA {
  type: number
  title: string
  description: string
  data: string
}