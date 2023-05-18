/* eslint-disable @typescript-eslint/no-empty-interface */
export interface dtoResponse {
  status: string
}

export interface dtoResponsePage extends dtoResponse {
  pageInfo: dtoPageInfo
  data: any
}

interface dtoPageInfo {
  page: number
  size: number
  totalElements: number
  totalPages: number
}
