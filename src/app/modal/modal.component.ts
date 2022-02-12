import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ITask} from '../interfaces/tasks.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  newTask: ITask;

  modalForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor() {
  }

  close() {
    this.closeModal.emit(true);
  }

  submit() {
    if (this.modalForm.invalid) {
      return alert('Please fill out all fields, with correct format');
    }
    this.newTask = this.modalForm.value;
    this.newTask.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.newTask.status = 'toDo';
  }
}
