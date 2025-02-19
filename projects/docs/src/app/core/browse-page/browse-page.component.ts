import { HttpClient } from '@angular/common/http';
import {
  Component,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconRegistry } from '../../models/icon-registry';
import { IconModel } from '../../models/icon.model';
import { SourceCodeComponent } from '../source-code/source-code.component';
import { IconCardComponent } from './icon-card/icon-card.component';
import { IconDetailComponent } from './icon-detail/icon-detail.component';

@Component({
  selector: 'app-browse-page',
  imports: [
    IconCardComponent,
    IconDetailComponent,
    FormsModule,
    SourceCodeComponent,
  ],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.css',
})
export class BrowsePageComponent {
  registry = input.required<IconRegistry>();

  openedIcon = signal<IconModel | undefined>(undefined);

  http = inject(HttpClient);

  search = model<string>();

  tree = input.required<IconModel[]>();

  installCode = computed(
    () => `npm install @nginf/iconic-${this.registry().id}`
  );

  filteredItems = computed(() => {
    const search = this.search();
    if (!search) {
      return this.tree();
    }
    return this.tree().filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });
}
