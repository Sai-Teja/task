import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material'
import { ListService, ContentSource } from '../list.service'
import { Router } from "@angular/router"

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'email', 'first_name', 'last_name']
  source: ContentSource = new ContentSource(0, 0, 0, 0, [])

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: ListService, private router: Router) {

  }

  ngOnInit() {
    this.refreshList(0)
  }

  refreshList(index : number) {
     this.service.getUsers(index).subscribe(source => {
      console.log(source)
      this.source = source
    })
  }

  onClick(id: number) {
    this.router.navigateByUrl('/detail/' + String(id))
  }
}

export class User {
  constructor(
    public id: number,
    public email: string,
    public avatar: string,
    public first_name: string,
    public last_name: string
  ) { }
}
