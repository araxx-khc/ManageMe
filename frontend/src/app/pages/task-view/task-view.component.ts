import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;

  selectedListId: any;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      const listId = params['listId']; // Retrieve the listId from params
  
      if (listId) {
        this.selectedListId = listId;
        this.taskService.getTasks(listId).subscribe((tasks) => {
          this.tasks = tasks;
        });
      }
    });
  
    this.taskService.getLists().subscribe((lists) => {
      this.lists = lists;
    });
  }

  onTaskClick(task: Task) {
    // Set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // The task has been set to completed successfully
      console.log("happy!");
      task.completed = !task.completed;
    });
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res) => {
      this.tasks = this.tasks.filter((val: { _id: string; }) => val._id !== id)
      console.log(res);
    })
  }
}