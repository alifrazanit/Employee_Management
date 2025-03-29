import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading = signal(false);

  constructor() { }

  get isLoading(): Signal<boolean> {
    return this._isLoading;
  }

  setLoading(loading: boolean) {
    this._isLoading.set(loading);
  }
}
