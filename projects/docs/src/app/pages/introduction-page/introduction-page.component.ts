import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICON_LIBRARIES } from '../../ICON_LIBRARIES';

@Component({
  selector: 'app-introduction-page',
  imports: [RouterLink],
  templateUrl: './introduction-page.component.html',
  styleUrl: './introduction-page.component.css',
})
export class IntroductionPageComponent {
  iconLibraries = ICON_LIBRARIES;
}
