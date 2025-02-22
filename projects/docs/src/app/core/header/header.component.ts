import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, take, takeUntil } from 'rxjs';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { GithubComponent } from "../icon/github.component";
import { MenuComponent } from '../icon/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, IconButtonComponent, MenuComponent, GithubComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  overlay = inject(Overlay);
  overlayRef: OverlayRef | undefined;
  router = inject(Router);
  showSidebar() {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().left(),

      hasBackdrop: true,
      disposeOnNavigation: true,
    });
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef?.dispose();
    });
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .pipe(take(1))
      .pipe(takeUntil(this.overlayRef.backdropClick().pipe(take(1))))
      .subscribe(() => {
        this.overlayRef?.dispose();
      });
    this.overlayRef.attach(new ComponentPortal(SidebarComponent));
  }
}
