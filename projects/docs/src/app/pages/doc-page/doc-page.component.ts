import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../core/sidebar/sidebar.component";

@Component({
  selector: 'app-doc-page',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './doc-page.component.html',
  styleUrl: './doc-page.component.css',
})
export class DocPageComponent {}
