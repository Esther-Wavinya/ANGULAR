import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  @Input() data: { value: number; label: string;}[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
