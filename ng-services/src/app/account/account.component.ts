import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService, AccountsService]
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private loggingService: LoggingService, private accountsService: AccountsService){
    // this.accountsService.statusUpdated.subscribe((status: string) => alert("Status updated to "+ status));
  }


  onSetTo(status: string) {
    // this.statusChanged.emit({id: this.id, newStatus: status});
    // we will using a service instead
    this.accountsService.updateStatus(this.id, status);

    this.accountsService.statusUpdated.emit(status);



    // console.log('A server status changed, new status: ' + status);
    // const service = new LoggingService();
    // service.logStatusChange(status);
    // this.loggingService.logStatusChange(status);
  }
}
