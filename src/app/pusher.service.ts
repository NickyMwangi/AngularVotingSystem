import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const Pusher: any;
declare const promisify: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  constructor() {
    var pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true,
    });
    this.channel = pusher.subscribe('vote-channel');
  }
  channel;

  public init() {
    return this.channel;
  }
}
