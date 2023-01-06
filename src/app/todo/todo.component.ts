import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent implements OnInit {

  todos: any[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.fireCollection.valueChanges({ idField: 'id' })
      .subscribe(item => {
        this.todos = item.sort((a: any, b: any) => {
          return a.isDone - b.isDone;
        });
      });
  }

  onClick(title: HTMLInputElement) {
    if (title.value) {
      this.todoService.addToDo(title.value);
      title.value = "";
    }
  }

  onChangeStatus(id: string, newStatus: boolean) {
    this.todoService.updateStatus(id, newStatus);
  }

  onDeleted(id: string) {
    this.todoService.deleteToDo(id);
  }

}
