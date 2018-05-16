import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // declare the tasks property to be an array - it will be reassigned when we get data from the server
  tasks = [];
  // declare the selectedTask property - it will be assigned when we get data
  selectedTask;

  // dependency injection - this is how our component will talk to the model (the service)
  constructor(private _httpService: HttpServiceService){}

  ngOnInit(){
    // this.getOne("5a7c8edfe2c0e253ad3e4a2b");
  }

  // user picks one task without another request to the server
  choose(task){
    this.selectedTask = task;
  }
  // user picks one and it uses the id to make a request to the server
  getOne(id){
    let obs = this._httpService.getOne(id);
    obs.subscribe(res => {
      console.log("Got a response from get one", res);
      if(res['message']=="Success"){
        this.selectedTask = res['task']
      }
      else {
        console.log("Error getting one task");
      }
    })
  }
  // get all the data
  getAll(){
    // make the variable 'observable' and assign it to whatever is returned by the getAll method in the service
    let observable = this._httpService.getAll();
    // subscribe to the observable
    observable.subscribe(res => {
      // check if the response has a message of "success"
      if(res['message']=="Success"){
        console.log("We got a success");
        // assign our property of tasks to the array in the response
        this.tasks = res['tasks'];
      }
      else {
        console.log("There was an error", res['error'])
      }
    })
  }
  
}
