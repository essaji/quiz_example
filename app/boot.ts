import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppCmp} from './main';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';
import {QuestionService} from './question.serivce';

bootstrap(AppCmp,[
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    QuestionService
]);