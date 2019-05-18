import { Component, OnInit } from '@angular/core';
import { User } from '../list/list.component';
import { ListService } from '../list.service';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  user: User

  constructor(private service: ListService, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    this.service
      .getUser(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(source => {
        console.log(source)
        this.user = source.data
      })
  }

  goBack() {
    this._location.back();
  }
}
