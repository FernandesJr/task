import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  panelOpenState = false;
}
