import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  fireCollection: AngularFirestoreCollection;

  constructor(private angularFire: AngularFirestore) {
    this.fireCollection = angularFire.collection('todos');
  }

  addToDo(title: string) {
    this.fireCollection.add({
      title,
      isDone: false,
      ceated_at: new Date(),
    });
  }

  updateStatus(id: string, newStatus: boolean) {
    this.fireCollection.doc(id).update({
      isDone: newStatus
    })
  }

  deleteToDo(id: string) {
    this.fireCollection.doc(id).delete();
  }
}
