import { Injectable } from '@angular/core';

@Injectable()
export class HelloService {
    public sayHello(): string {
        return 'hi!';
    }
}