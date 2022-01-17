import {
   animate,
   state,
   style,
   transition,
   trigger
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
   selector: 'carousel',
   templateUrl: './carousel.component.html',
   styleUrls: ['./carousel.component.scss'],
   animations: [
      trigger('fade', [
         state('void', style({ opacity: 0 })),
         transition('void <=> *', [animate('1s')])
      ])
   ]
})
export class CarouselComponent implements OnInit {
   @Input()
   items: Movie[] = [];

   currentSlideIndex: number = 0;

   ngOnInit(): void {
      setInterval(() => {
         this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
      }, 8000);
   }
}
