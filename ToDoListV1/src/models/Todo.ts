export interface Todo{
    content: string;
    isDone: boolean;
}

export const defaultTodoList: Todo[] = [
    {
      content: 'Eat',
      isDone: false
    },
    {
      content: 'Code',
      isDone: false
    },
    {
      content: 'Repeat',
      isDone: false
    }
  ];

export const defaultFinishedList: Todo[] = [
    {
      content: 'Sleep',
      isDone: true
    }
  ];