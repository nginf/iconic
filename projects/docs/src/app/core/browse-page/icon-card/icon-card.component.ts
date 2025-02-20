import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconComponent } from '../../../core/icon/icon.component';
import { IconModel } from '../../../models/icon.model';
import { TooltipDirective } from '../../tooltip/tooltip.directive';

@Component({
  selector: 'app-icon-card',
  imports: [IconComponent, TooltipDirective],
  templateUrl: './icon-card.component.html',
  styleUrl: './icon-card.component.css',
})
export class IconCardComponent implements AfterViewInit {
  selected = output();
  icon = input.required<IconModel>();
  sanitizer = inject(DomSanitizer);

  isSelected = input.required<boolean>();

  content = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.icon().content)
  );

  private element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  ngAfterViewInit(): void {
    // const svg = this.element.querySelector('svg');
    // if (svg) {
    //   svg.setAttribute('width', '24px');
    //   svg.setAttribute('height', '24px');
    // }
  }
}
