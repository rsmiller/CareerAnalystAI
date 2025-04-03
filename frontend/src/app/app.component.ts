import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import * as signalR from "@microsoft/signalr";
import { StreamFormatter } from './stuff/StreamFormatter';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public messageContent: string = "";
  public promptMessage: string ="";
  public enabledBtn: boolean = true;


  // For formating
  private dildo: string[] = new Array<string>();

  private connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5049/prompthub")
    .build();

  private formatter = new StreamFormatter();

  async ngOnInit()
  {
    this.connection.on("ReceiveChunk", (chunk) => {
      this.formatter.appendChunk(chunk);
      
      this.messageContent = this.formatter.flush();
    });

    this.connection.on("Complete", async () => {
      console.log(this.connection.state);
      await this.connection.stop();
    });
  }

  public async doSubmit()
  {
    this.messageContent = "";
    this.formatter.clear();

    this.enabledBtn = false;

    var self = this;

    setTimeout(() => {
      self.enabledBtn = true;
    }, 15000);

    await this.connection.start();
    await this.connection.invoke("StreamChat", this.promptMessage);
  }
}
