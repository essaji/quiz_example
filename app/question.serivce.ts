import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class QuestionService{

    constructor(private _http:Http){}
    getQuestions(){
        return this._http.get("app/questions.json");
    }
}