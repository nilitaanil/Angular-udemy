import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent:string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent:string}>();
    // @Output() serverCreated : EventEmitter<{serverName: string, serverContent:string}> = new EventEmitter();
    // @Output() blueprintCreated : EventEmitter<{serverName: string, serverContent:string}> = new EventEmitter();
    // above one not working


  constructor() { }

  ngOnInit(): void {
  }

  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  onAddServer(nameInput: HTMLInputElement) {
    // console.log(this.serverContentInput);

  //   this.serverElements.push({
  //     type: 'server',
  //     name: this.newServerName,
  //     content: this.newServerContent
  //   });

  // console.log(nameInput.value);   Local reference

  this.serverCreated.emit(
    {
      serverName : nameInput.value, 
      // serverContent : this.newServerContent
      serverContent: this.serverContentInput.nativeElement.value 
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    // this.serverElements.push({
    //   type: 'blueprint',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });

    this.blueprintCreated.emit(
      {
        serverName : nameInput.value, 
        serverContent : this.serverContentInput.nativeElement.value 
      });
    }
  }
