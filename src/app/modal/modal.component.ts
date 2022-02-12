import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ITask} from '../interfaces/tasks.interface';
import {TasksService} from '../services/tasks.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnChanges {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() task: ITask;

  newTask: ITask;

  modalForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private tasksService: TasksService
  ) {
  }

  ngOnChanges() {
    if (this.task) {
      this.modalForm.get('name').patchValue(this.task.name);
      this.modalForm.get('description').patchValue(this.task.description);
      this.newTask = this.task;
    }
  }

  close() {
    this.closeModal.emit(true);
  }

  submit() {
    if (this.modalForm.invalid) {
      return alert('Please fill out all fields, with correct format');
    }
    if (this.task) {
      this.newTask.name = this.modalForm.get('name').value;
      this.newTask.description = this.modalForm.get('description').value;
      this.tasksService.editTask(this.newTask);
      return this.close();
    }
    this.newTask = this.modalForm.value;
    this.tasksService.setTask(this.newTask);
    return this.close();
  }
}
