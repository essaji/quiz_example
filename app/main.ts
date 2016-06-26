import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES,RouteConfig} from '@angular/router-deprecated';
import {QuizCmp} from './quiz.component'

@Component({
    selector: 'app',
    template: `
        <div style="padding: 100px;" *ngIf="!started" >
            <a [routerLink]="['Quiz']" class="btn btn-primary" (click)="started = !started" >Start Quiz</a>
        </div>
        <br>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: "/quiz", name: "Quiz", component: QuizCmp}
])
export class AppCmp{
    public started = false;
}
