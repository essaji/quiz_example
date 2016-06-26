import {Component} from '@angular/core';
import {QuestionService} from './question.serivce';

@Component({
    selector: 'quiz',
    template: `
        <div class="panel panel-primary" *ngIf="!test_finished" >
            <div class="panel-heading" >
                <h3>Quiz <i>({{start_time}} - {{end_time}})</i></h3>
                <h4 style="float: right;" >Time Left: {{time_left}}</h4>
                <h5 *ngIf="quiz" >Question # {{quiz.questions.indexOf(current_question)+1}} out of 10</h5>
            </div>
            <div class="panel-body">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h5>{{current_question.text}}</h5>
                    </div>
                    <div class="panel-body">
                        <div *ngFor="let option of current_question.options" >
                            <input type="radio" (click)="current_question.optionSelected = option" name="options" [checked]=" current_question.optionSelected && getKeys(current_question.optionSelected)[0] == getKeys(option)[0]" />
                            ({{getKeys(option)[0]}}) {{option[getKeys(option)[0]]}}
                        </div>
                    </div>
                    <div class="panel-footer" style="text-align: right;">
                        <button *ngIf="quiz && quiz.questions.indexOf(current_question) !== 0" class="btn btn-primary" style="min-width: 150px;" (click)="back()" >Go Back</button>
                        <button class="btn btn-primary" style="min-width: 150px;" (click)="next(true)" >Skip</button>
                        <button class="btn btn-success" style="min-width: 150px;" (click)="next(false)" *ngIf="quiz && quiz.questions.indexOf(current_question) !== quiz.questions.length-1" >Save & Continue</button>
                        <button class="btn btn-success" *ngIf="quiz && quiz.questions.indexOf(current_question) == quiz.questions.length-1" (click)="test_finished = !test_finished" >Finish Quiz</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-primary" *ngIf="test_finished" >
            <div class="panel-heading">
                <h4>Your Answers</h4>
            </div>
            <div class="panel-body" >
                <div *ngFor="let q of quiz.questions">
                    <strong>{{q.text}}</strong>
                    <div *ngIf="q.optionSelected" >
                        <strong>({{getKeys(q.optionSelected)[0]}})</strong>: {{q.optionSelected[getKeys(q.optionSelected)[0]]}}
                    </div>

                    <div *ngIf="!q.optionSelected" >
                        NOT ANSWERED.
                    </div>
                    <br>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .panel {
            max-width: 800px;
            margin: 10px auto;
        }
    `]
})
export class QuizCmp{

    public time_left = "";
    public test_finished = false;
    public start_time = "";
    public end_time = "";

    public current_question = {
        text: "",
        options: [],
        optionSelected: ""
    };

    public questionIndex = 0;

    public quiz:{start_time:number,end_time:number,questions:Array};

    constructor(private _questionService:QuestionService){
        var self = this;
        this._questionService.getQuestions().subscribe(
            (data) => {
                self.quiz = data.json();
                self.current_question = self.quiz.questions[self.questionIndex];

                this.quiz.start_time = new Date().getTime() / 1000;
                this.quiz.end_time = this.quiz.start_time + (30*60);
                this.start_time = new Date(this.quiz.start_time * 1000).toLocaleTimeString();
                this.end_time = new Date(this.quiz.end_time * 1000).toLocaleTimeString();
                self.startTimer();


            },
            (error) => console.log(error)
        );
    }

    startTimer(){
        var intervalId = setInterval(()=>{
            this.quiz.start_time++;
            let totalSec = this.quiz.end_time - this.quiz.start_time;
            let hours = parseInt((totalSec / 36000)) % 24;
            let minutes = parseInt((totalSec / 60)) % 60;
            let seconds = parseInt(totalSec) % 60;

            this.time_left = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);

            if(totalSec == 0){
                clearInterval(intervalId);
                this.test_finished = true;
            }

        },1000);

    }

    getKeys(obj){
        return Object.keys(obj);
    }

    next(skip){
        if(skip)
            this.current_question.optionSelected = "";

        if(++this.questionIndex !== this.quiz.questions.length)
            this.current_question = this.quiz.questions[this.questionIndex];
        else
            this.test_finished = true;

    }

    back(){
        if(this.questionIndex > 0)
            this.current_question = this.quiz.questions[--this.questionIndex];
    }
}