import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmenuService {
  private activeSubmenuSubject = new BehaviorSubject<string | null>(null);
  activeSubmenu$ = this.activeSubmenuSubject.asObservable();

  setActiveSubmenu(submenuId: string | null) {
    this.activeSubmenuSubject.next(submenuId);
  }
}