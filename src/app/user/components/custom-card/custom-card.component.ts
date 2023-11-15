import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
interface Location {
  id: number;
  name: string;
}

interface MediaFile {
  id: number;
  imageUrl: string;
  name: string;
  size: number;
}

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  location: Location;
  checkInInstruction: string;
  status: boolean;
  price: number | null; // Change the type to the actual type if needed
  listMediaFiles: MediaFile[];
}

interface Tile {
  id: number;
  cols: number;
  rows: number;
  url: string;
}

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css'],
})
export class CustomCardComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  @Input() hotelData: Hotel = {
    id: 0,
    name: '',
    address: '',
    description: '',
    location: { id: 0, name: '' },
    checkInInstruction: '',
    status: false,
    price: null,
    listMediaFiles: [],
  };

  tiles: Tile[] = [
    { id: 0, cols: 4, rows: 1, url: '' },
    { id: 0, cols: 2, rows: 1, url: '' },
    { id: 0, cols: 2, rows: 1, url: '' },
  ];

  ngOnInit(): void {
    this.tiles = this.handleDisplayImage();
  }

  private handleDisplayImage(): Tile[] {
    const newTiles = this.tiles.map((tile, index) => {
      return {
        ...tile,
        id: this.hotelData.listMediaFiles[index].id,
        url: this.hotelData.listMediaFiles[index].imageUrl,
      };
    });
    return newTiles;
  }
}
