import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data:{name: string; age:number; job: string; employed: boolean;}[]=[];
  @Input() headers:{key: any; label: string;}[] = [];

  constructor() {}

  ngOnInit() {}
}
