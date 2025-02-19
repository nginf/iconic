import { Component } from '@angular/core';
import { SourceCodeComponent } from '../../core/source-code/source-code.component';

@Component({
  selector: 'app-home-page',
  imports: [SourceCodeComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  installCode = `npm install ng-iconic`;
  importCode = `import { faChevronDown } from 'ng-iconic';`;
  usageCode = `
      @Component({
        template:' <h1> Hello <fa-chevron-down size="16"> </fa-chevron-down> </h1> ',
        imports:[faChevronDown]
      })
      export class PageComponent{
      }
  `;
}
