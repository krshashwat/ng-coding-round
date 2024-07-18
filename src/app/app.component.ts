import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

interface TaskItem {
  id: number;
  date: any;
  task: string;
  priority: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
  ) {}
  taskList: Array<TaskItem> = [];

  showAddForm = true;

  dateSort = true;

  prioritySort = true;

  taskForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.taskForm = this.formBuilder.group({
      id: [null, []],
      date: [null, [Validators.required]],
      task: ['', [Validators.required]],
      priority: [null, [Validators.required]],
    });
  }

  sortResponse(): void {
    if (this.taskList.length) {
      if (this.prioritySort) {
        this.taskList.sort((a, b) => b.priority - a.priority)
      } else {
        this.taskList.sort((a, b) => a.priority - b.priority)
      }
    }
    
    
  }

  handleTaskSubmit(): void {
    if (this.taskForm.valid) {
      // check id if present
      if (this.taskForm.value.id && this.taskForm.value.id >= 0) {
        // find this id in array and remove it and add new item
        const index = this.taskList.findIndex((item) => item.id === this.taskForm.value.id);
        if (index >=0) {
          this.taskList.splice(index, 1);
        }
        const taskObj = {
          id: this.taskForm.value.id,
          date: this.taskForm.value.date,
          task: this.taskForm.value.task,
          priority: Number(this.taskForm.value.priority),
        }
        this.taskList.push(taskObj);
      } else {
        const randomId = Math.round(Math.random() * 1000);
        const taskObj = {
          id: randomId,
          date: this.taskForm.value.date,
          task: this.taskForm.value.task,
          priority: Number(this.taskForm.value.priority),
        }
        this.taskList.push(taskObj);
      }

    } else {
      alert('Form is not valid');
    }
    this.sortResponse();
    this.taskForm.reset();
  }

  editTaskItem(task: TaskItem): void {
    this.taskForm.controls['date'].setValue(task.date);
    this.taskForm.controls['id'].setValue(task.id);
    this.taskForm.controls['priority'].setValue(task.priority);
    this.taskForm.controls['task'].setValue(task.task);
    
  }

  deleteTaskItem(task: TaskItem): void {
    if (task && task.id) {
      const index = this.taskList.findIndex((item) => item.id === task.id);
      if (index >=0) {
        this.taskList.splice(index, 1);
      }
    }
  }

}
