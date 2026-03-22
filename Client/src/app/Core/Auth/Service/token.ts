import { Injectable } from '@angular/core';
import { HttpSvc } from './http-svc';

@Injectable({
  providedIn: 'root',
})
export class Token extends HttpSvc{}
