import {Component, OnDestroy} from '@angular/core';
import {TasksService} from '../services/tasks.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ITask} from '../interfaces/tasks.interface';
import {Status} from '../enums/status.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnDestroy {

  showModal = false;

  alive$: Subject<any> = new Subject<any>();

  tasks: ITask[] = [];

  task: ITask;

  get Status() {
    return Status;
  }

  constructor(
    private tasksService: TasksService
  ) {
    this.tasksService.tasks.pipe(takeUntil(this.alive$)).subscribe(data => {
      this.tasks = data;
    });
  }

  finishTask(task: ITask) {
    if (task.status === Status.Done) {
      return alert('Task already Done');
    }
    return this.tasksService.finishTask(task.id);
  }

  removeTask(taskId: number) {
    this.tasksService.removeTask(taskId);
  }

  editTask(task: ITask) {
    this.task = task;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.task = null;
  }

  ngOnDestroy() {
    this.alive$.next();
    this.alive$.complete();
  }
}
