import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quicktodos',
  templateUrl: './quicktodos.component.html',
  styleUrls: ['./quicktodos.component.css'],
})
export class QuicktodosComponent implements OnInit {
  play: any = true;
  mute: any = true;

  constructor() {}

  ngOnInit(): void {
    let video = <HTMLVideoElement>document.getElementById('video');
    video.muted = true;
    video.autoplay = true;
    video.load();
    video.play();
  }

  onPlay(p: boolean) {
    this.play = !p;
    let video = <HTMLVideoElement>document.getElementById('video');
    if (!p) video.play();
    else video.pause();

    console.log('Play');
    $('.player-buttons1').toggleClass('playShow');
  }

  onMute(m: boolean) {
    this.mute = !m;
    let video = <HTMLVideoElement>document.getElementById('video');
    video.muted = !m;

    console.log('Mute', m, !m);
  }
}
