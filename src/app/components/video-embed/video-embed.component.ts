import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})
export class VideoEmbedComponent implements OnInit {
  @Input()
  site: string = 'YouTube';
  @Input()
  key: string | null = null;
  safeUrl: SafeResourceUrl | null = null;
  baseUrl: string =
    this.site === 'YouTube'
      ? 'https://www.youtube.com/embed/'
      : this.site === 'Vimeo'
      ? 'https://player.vimeo.com/video/'
      : '';

  constructor(private sanitazier: DomSanitizer) {}

  getSafeUrl(url: string) {
    return this.sanitazier.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.safeUrl = this.getSafeUrl(this.baseUrl + this.key);
  }
}
