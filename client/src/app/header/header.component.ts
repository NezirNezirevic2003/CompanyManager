import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // Modalservice constructor
  constructor(private modalService: ModalService) {}
  // Gebruikersnaamtype
  username: any = [];

  // Eerste paginaload
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  // Open modal functie
  openModal(id: string) {
    this.modalService.open(id);
  }

  // open menu functie
  openMenu() {
    var mobileButton = document.getElementById('mobileButton');
    var menu = document.getElementById('mobile-menu');
    var closeButton = document.getElementById('closeButton');
    if (mobileButton?.click) {
      menu!.style.display = 'block';
      mobileButton!.style.display = 'none';
      closeButton!.style.display = 'block';
    }
  }

  // Open profielfunctie modal
  openProfile() {
    var profileButton = document.getElementById('profileButton');
    var profileMenu = document.getElementById('profileMenu');
    if (profileButton?.click) {
      profileMenu!.style.display = 'block';
    }
  }

  // Menu dischtdoen functie
  closeMenu() {
    var mobileButton = document.getElementById('mobileButton');
    var menu = document.getElementById('mobile-menu');
    var closeButton = document.getElementById('closeButton');
    if (closeButton?.click) {
      menu!.style.display = 'none';
      mobileButton!.style.display = 'block';
      closeButton!.style.display = 'none';
    }
  }

  // Modal dichtdoen
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
