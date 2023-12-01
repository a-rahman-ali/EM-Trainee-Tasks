import { Component, TemplateRef } from '@angular/core';
import { Todo, defaultTodoList, defaultFinishedList } from 'src/models/Todo';
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
  public todoList: Todo[] = defaultTodoList;
  // Default values of finished tasks
  public finishedList: Todo[] = defaultFinishedList;

  public onAdd(): void{
    const trimmedValue = this.todoValue.trim();
    if (trimmedValue !== '' && isNaN(Number(trimmedValue))) {
      this.todoList.push({ content: this.todoValue, isDone: false });
      this.todoValue = '';
    }else{
      if(trimmedValue === ''){
        window.alert("Empty todo cannot be added");
      }else{
        window.alert("Cannot add just numeric values as a todo");
      }
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
  public onDeleteConfirm(index: number, content: any, isTodoList: boolean): void{
    const modalRef = this.modalService.open(content, { centered: true });

    modalRef.result.then(
      (result) => {
        if (result === 'delete') {
          if(isTodoList){
            this.todoList.splice(index, 1);
          }
          else{
            this.finishedList.splice(index, 1);
          }
        }
      }
    );
  }
}
