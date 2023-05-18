/* eslint-disable @typescript-eslint/no-empty-interface */
export interface dtoResponse {
  status: string
}

export interface dtoResponsePage<T> extends dtoResponse {
  pageInfo: dtoPageInfo
  data: T[]
}

interface dtoPageInfo {
  page: number
  size: number
  totalElements: number
  totalPages: number
}
