import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-deletecomponent',
  templateUrl: './deletecomponent.component.html',
  styleUrls: ['./deletecomponent.component.css']
})
export class DeletecomponentComponent implements OnInit {

    //input decorator----declaring item here--data is shared from parent to child
 @Input() item:string|undefined  //item have the acno that is to be delete,come from dashboard.ts--from parent item needs to share at child

 //output decorator
 @Output() onCancel=new EventEmitter()  //generate event oncancel

 //creating on delete event-since it occuring in parent,so put it in @output--data shared from child to parent
 @Output() onDelete=new EventEmitter()   //created an event ondelete using Eventemitter()


  constructor() {

    // console.log(this.item);
    
   }

  ngOnInit(): void {
  }

  cancel(){
    this.onCancel.emit()  //occur event oncancel
  }
  delete(){   // delete() is binded when delte button is clicked
    //emit the event ondelete with account to be deleted as the argument
    this.onDelete.emit(this.item) //ondelete() is occuring
  }

}

//this is child---what child doing is when the delete button is clicked an event is generated and also an argument is passing in event 
// event can happen anywhre //wherever the child html there is happening the delete when delete button is clicked
  
//dashboard is parent--event occur in parent---exact deleting of account is happening in dashboard