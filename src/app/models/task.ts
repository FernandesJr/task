export interface Task {
  id?: string,
  title: string,
  description: string,
  finishDateTime?: Date | null,
  status?: boolean
}

