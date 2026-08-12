import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Navbar } from '../../core/components/navbar/navbar';

@Component({
  selector: 'app-soap-page',
  standalone: true,
  imports: [Navbar, NgFor],
  templateUrl: './soap-page.html',
  styleUrls: ['./soap-page.scss'],
})
export class SoapPage {

  products = [
    {
      name: 'Sabonete de Eucalipto',
      // description: '', 
      image: 'eucalipto.png'
    },
    {
      name: 'Sabonete de arruda e sal grosso',
      // description: 'Monitoriza a tua saúde e atividade.',
      image: 'arruda_sal_grosso.png'
    },
    {
      name: 'Sabonete de Aveia',
      // description: '',
      image: 'aveia.png'
    },
    {
      name: 'Sabonete de Curcuma',
      // description: '',
      image: 'curcuma_ft.png'
    },
    {
      name: 'Sabonete de limão e eucalipto',
      // description: '',
      image: 'limaoEucalipto.png'
    }
  ];

}