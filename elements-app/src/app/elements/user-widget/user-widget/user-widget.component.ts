import { Component } from '@angular/core';
import { HelloService } from 'src/app/greet.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.scss']
})
export class UserWidgetComponent {
  public counter$ = new BehaviorSubject<number>(0);

  constructor(private helloService: HelloService) { }


  public get greet(): string {
    return this.helloService.sayHello();
  }

  public countUp(): void {
    this.counter$.next(this.counter$.value + 1);
  }
}
