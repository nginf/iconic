import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, input, output } from '@angular/core';
import { IconComponent } from '../../../core/icon/icon.component';
import { SourceCodeComponent } from '../../../core/source-code/source-code.component';
import { IconModel } from '../../../models/icon.model';
import { IconButtonComponent } from '../../icon-button/icon-button.component';
import { CloseComponent } from '../../icon/close.component';

@Component({
  selector: 'app-icon-detail',
  imports: [
    SourceCodeComponent,
    IconComponent,
    IconButtonComponent,
    CloseComponent,
  ],
  templateUrl: './icon-detail.component.html',
  styleUrl: './icon-detail.component.css',
  animations: [
    trigger('detail', [
      transition(':enter', [
        // Add the animation for the detail panel
        style({ opacity: 0, transform: 'translateY(200px)' }),
        animate('250ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
  host: {
    '(document:keydown)': 'onKeydown($event)',
  },
})
export class IconDetailComponent {
  icon = input.required<IconModel>();
  closed = output();
  registryId = input.required<string>();

  importCode = computed(
    () =>
      `import { ${
        this.icon().compName
      } } from '@nginf/iconic-${this.registryId()}';`
  );

  usageCode = computed(() => `<${this.icon().name}></${this.icon().name}>`);

  onKeydown($event: KeyboardEvent) {
    if ($event.key === 'Escape') {
      this.closed.emit();
    }
  }
}
