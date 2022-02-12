import {Injectable} from '@angular/core';
import {ITask} from '../interfaces/tasks.interface';
import {BehaviorSubject} from 'rxjs';
import {Status} from '../enums/status.enum';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  tasks = new BehaviorSubject([]);

  tasksArray: ITask[] = [];

  constructor(
  ) {
    if (localStorage.getItem('tasks')) {
      this.tasksArray = JSON.parse(localStorage.getItem('tasks'));
      this.tasks = new BehaviorSubject(JSON.parse(localStorage.getItem('tasks')));
    }
  }

  setTask(task: ITask) {
    task.id = Date.now();
    task.date = moment().format('LL');
    task.status = Status.ToDo;
    this.tasksArray.push(task);
    this.tasks.next(this.tasksArray);
    localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
  }

  finishTask(taskId: number) {
    const elem = this.tasksArray.find(task => task.id === taskId);
    const index = this.tasksArray.indexOf(elem);
    if (index !== -1 && elem.status === Status.ToDo) {
      this.tasksArray[index].status = Status.Done;
      this.tasks.next(this.tasksArray);
      localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
    }
  }

  removeTask(taskId: number) {
    const elem = this.tasksArray.find(task => task.id === taskId);
    const index = this.tasksArray.indexOf(elem);
    if (index !== -1) {
      this.tasksArray.splice(index, 1);
      this.tasks.next(this.tasksArray);
      localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
    }
  }

  editTask(newTask: ITask) {
    const elem = this.tasksArray.find(task => task.id === newTask.id);
    const index = this.tasksArray.indexOf(elem);
    if (index !== -1) {
      this.tasksArray[index] = newTask;
      this.tasks.next(this.tasksArray);
      localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
    }
  }
}
