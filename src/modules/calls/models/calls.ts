export interface Note {
  id: number,
  content: string
}

export interface Call {
  id: number,
  direction: string,
  from: string,
  to: string,
  duration: number,
  via: string,
  is_archived: boolean,
  call_type: string,
  created_at: string,
  notes: [Note],
}

export interface PaginatedCalls {
  hasNextPage: boolean
  nodes: [Call]
  totalCount: number
}
