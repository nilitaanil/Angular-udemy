import { Component } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{type:'server', name:'Testserver', content: 'Just a test!'}];

  onServerAdded( serverData : {serverName: string, serverContent: string}) {
    //   this.serverElements.push({
    //     type: 'server',
    //     name: this.newServerName,
    //     content: this.newServerContent
    //   });
    // this.newServerName and this.newServerContent no there in app,component.ts\

      this.serverElements.push({
        type: 'server',
        name: serverData.serverName,
        content: serverData.serverContent
      });


    }
  
    onBlueprintAdded( blueprintData : {serverName: string, serverContent: string}) {
      this.serverElements.push({
        type: 'blueprint',
        name: blueprintData.serverName,
        content: blueprintData.serverContent
      });
    }

    onChangeFirst(){
      // Change the name of the first element in the array serverElements
     this.serverElements[0].name = "Changed!"; 
    }

    onDestroyFirst(){
      this.serverElements.splice(0,1);
    }


  
}
