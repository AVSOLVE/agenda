import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeroComponent implements OnInit {
  products: any = [{
    name: 'Fisioterapia',
    description: 'Product Description',
    image: 'https://img.icons8.com/ios/50/physical-therapy.png',
},
{
    name: 'Pilates',
    description: 'Product Description',
    image: 'https://img.icons8.com/ios/50/pilates.png',
},
{
    name: 'RPG',
    description: 'Product Description',
    image: 'https://img.icons8.com/ios/50/posture.png',
},
{
    name: 'Gestantes',
    description: 'Product Description',
    image: 'https://img.icons8.com/ios/50/pregnant.png',
},
{
    name: 'Fisio Pélvica',
    description: 'Product Description',
    image: 'https://img.icons8.com/external-good-lines-kalash/32/external-female-human-body-anatomy-good-lines-kalash-2.png',
},
{
    name: 'Acupuntura',
    description: 'Product Description',
    image: 'https://img.icons8.com/windows/32/acupuncture-needles.png',
},
{
    name: 'Home Care',
    description: 'Product Description',
    image: 'https://img.icons8.com/external-others-pike-picture/50/external-Helping-Disabled-People-homecare-others-pike-picture-2.png',
},
{
    name: 'Ortopedia',
    description: 'Product Description',
    image: 'https://img.icons8.com/dotty/80/right-footprint.png',
},
]

  responsiveOptions: any[] | undefined;
  constructor() { }

  ngOnInit() {
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '1100px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

}
