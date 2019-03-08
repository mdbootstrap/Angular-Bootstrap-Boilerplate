import { Injectable } from '@angular/core';
import * as md5 from 'md5';

@Injectable({
  providedIn: 'root'
})
export class GravatarService {

  constructor() { }

  getUserGravatar(email: string) {
    if (email) {
      return `https://www.gravatar.com/avatar/${md5(email)}`;
    }
  }
}
