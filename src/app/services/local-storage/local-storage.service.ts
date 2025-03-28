import { Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setItem(key: string, value: any) {
    if (this.isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    if (this.isBrowser) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }

  }

  removeItem(key: string) {
    if (this.isBrowser) {
      return localStorage.removeItem(key);
    }
  }

  removeAll() {
    if (this.isBrowser) {
      return localStorage.clear();
    }
  }

}
