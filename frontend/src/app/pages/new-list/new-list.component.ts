import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent {

  constructor(private taskService: TaskService, private router: Router) {}


  createList(title: string) {
    this.taskService.createList(title).subscribe((list: any) => {
      console.log(list);
      // Navigate to /lists/respone._id)
      this.router.navigate(['/lists', list._id]);
    });
  }

}
