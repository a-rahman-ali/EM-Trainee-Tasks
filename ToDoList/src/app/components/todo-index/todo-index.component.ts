import { Component, TemplateRef } from '@angular/core';
import { Todo } from 'src/models/Todo';
import {NgbModal} from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo-index',
  templateUrl: './todo-index.component.html',
  styleUrls: ['./todo-index.component.css']
})
export class TodoIndexComponent {
  public todoValue: string = '';

  constructor(private modalService: NgbModal){}
  // default list of pending tasks
  public todoList: Todo[] = [
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
  // Default values of finished tasks
  public finishedList: Todo[] = [
    {
      content: 'Sleep',
      isDone: true
    }
  ];

  public onAdd(): void{
    if (this.todoValue.trim() !== '') {
      this.todoList.push({ content: this.todoValue, isDone: false });
      this.todoValue = '';
    }else{
      window.alert("Empty todo cannot be added");
    }
  }
  public onChangeTodo(i: number): void{
    const item = this.todoList.splice(i, 1);
    this.finishedList.push(item[0]);
  }
  public onChangeFinished(i: number): void{
    const item = this.finishedList.splice(i, 1);
    this.todoList.push(item[0]);
  }
  // onDeleteTodo(i: number){
  //   const confirmation = window.confirm('Are you sure you want to delete this todo?');
  //   if (confirmation) {
  //     this.todoList.splice(i, 1);
  //   }
  // }
  // onDeleteFinished(i: number){
  //   const confirmation = window.confirm('Are you sure you want to delete this todo?');
  //   if (confirmation) {
  //     this.finishedList.splice(i, 1);
  //   }
  // }
  public onDeleteTodoConfirm(index: number, content: any): void{
    const modalRef = this.modalService.open(content, { centered: true });

    modalRef.result.then(
      (result) => {
        if (result === 'delete') {
          this.todoList.splice(index, 1);
        }
      },
      (reason) => {
        // Handle dismissal (e.g., clicking outside the modal)
      }
    );
  }
  public onDeleteFinishedConfirm(index: number, content: any): void{
    const modalRef = this.modalService.open(content, { centered: true });

    modalRef.result.then(
      (result) => {
        if (result === 'delete') {
          this.finishedList.splice(index, 1);
        }
      },
      (reason) => {
        // Handle dismissal (e.g., clicking outside the modal)
      }
    );
  }
}
