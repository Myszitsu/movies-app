import { Component, Input, AfterViewChecked } from '@angular/core';
import { Movie } from '../../models/movie';


@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewChecked {
  observer: IntersectionObserver | null = null;
  wasViewChecked: boolean = false
  @Input()
  id: string = 'thisId'

  @Input()
  items: Movie[] = []

  @Input()
  title: string = 'Title'

  ngAfterViewChecked(): void {
    if (document.getElementById(`${this.id}`)!.getElementsByClassName('card').length > 0  && !this.wasViewChecked) {
    const section = document.getElementById(`${this.id}`) as HTMLElement;
    const cards = Array.from(
      section.getElementsByClassName('card')
    ) as HTMLElement[];
    const scrollContainer = section.querySelector(
      '.slider__scroll-container'
    ) as HTMLDivElement;
    const observerArea = section.querySelector(
      '.slider__observer-area'
    ) as HTMLDivElement;
    const scrollLeftBtn = section.querySelector(
      '.slider__btn--left'
    ) as HTMLButtonElement;
    const scrollRightBtn = section.querySelector(
      '.slider__btn--right'
    ) as HTMLButtonElement;

    let currentIndex: number = 0;

    function setCounter(entries: IntersectionObserverEntry[]) {
      if (entries.length === 1) {
        const entry = entries[0];
        const card = entry.target as HTMLDivElement;
        currentIndex = cards.indexOf(card);
      }
    }

    function scrollCards(direction: 'left' | 'right') {
      const gap = +window
        .getComputedStyle(document.querySelector('.cards')!)
        .gap.slice(0, -2);
      const shiftValue = Math.floor(
        scrollContainer.clientWidth / observerArea.clientWidth
      );
      const scrollLeft = Math.round(scrollContainer.scrollLeft);

      let indexShift = 0;

      switch (direction) {
        case 'left':
          indexShift =
            currentIndex - shiftValue < 0 ? 0 : currentIndex - shiftValue;
          break;
        case 'right':
          indexShift =
            currentIndex + shiftValue > cards.length - 1
              ? cards.length - 1
              : currentIndex + shiftValue;
          indexShift =
            scrollLeft ===
            Math.round(scrollContainer.scrollWidth) -
              scrollContainer.clientWidth
              ? 0
              : indexShift;
          break;
      }

      const cardBoundLeft = cards[indexShift].getBoundingClientRect().left;
      const scrollContainerLeft = scrollContainer.getBoundingClientRect().left;

      const scrollX = scrollLeft + cardBoundLeft - scrollContainerLeft - gap;
      scrollContainer.scrollTo(scrollX, 0);
    }

    this.observer = new IntersectionObserver(setCounter, {
      root: scrollContainer,
      rootMargin: `0px -${
        scrollContainer.clientWidth - observerArea.clientWidth
      }px 0px 0px`,
      threshold: 0.8
    });

    cards.forEach((card) => this.observer!.observe(card));

    window.addEventListener('resize', () => {
      this.observer!.disconnect();

      this.observer = new IntersectionObserver(setCounter, {
        root: scrollContainer,
        rootMargin: `0px -${
          scrollContainer.clientWidth - observerArea.clientWidth
        }px 0px 0px`,
        threshold: 0.8
      });
      cards.forEach((card) => this.observer!.observe(card));
    });

    scrollLeftBtn.addEventListener('click', scrollCards.bind(null, 'left'));

    scrollRightBtn.addEventListener('click', scrollCards.bind(null, 'right'));

    scrollContainer.addEventListener('scroll', () => {
      if (scrollContainer.scrollLeft === 0) {
        scrollLeftBtn.style.opacity = '0';
        scrollLeftBtn.style.visibility = 'none';
      } else if (scrollLeftBtn.style.opacity !== '1') {
        scrollLeftBtn.style.opacity = '1';
        scrollLeftBtn.style.visibility = 'inherit';
      }
    });
    this.wasViewChecked = !this.wasViewChecked ? true : true
  }
  }
}
