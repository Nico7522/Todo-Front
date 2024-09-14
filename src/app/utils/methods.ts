import { Signal } from '@angular/core';
import { Task } from '../interfaces/tasks/task.interface';

export const isTokenExpiress = (tokenExpTime: number): boolean => {
  if (new Date(tokenExpTime * 1000) < new Date()) return true;

  return false;
};

export const filterArray = (
  array: Signal<Task[]>,
  searchQuery: string,
  priority: string,
  isComplete: boolean
): Task[] => {
  let filter = array().filter(
    (x) =>
      x.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      x.priority.toString().includes(priority)
  );
  if (isComplete) {
    filter = filter.filter((x) =>
      isComplete ? x.isComplete === isComplete : x
    );
  }

  return filter;
};
