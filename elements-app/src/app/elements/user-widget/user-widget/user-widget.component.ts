import { Component, OnInit } from '@angular/core';
import { HelloService } from 'src/app/greet.service';

@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.scss']
})
export class UserWidgetComponent implements OnInit {

  constructor(private helloService: HelloService) { }

  ngOnInit() {

  }

  public get greet(): string {
    return this.helloService.sayHello();
  }

}
