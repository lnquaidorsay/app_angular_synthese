import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ActionEvent} from './product.state';

@Injectable({providedIn:"root"})
export class EventDriverService {
  sourceEventSubject:Subject<ActionEvent>=new Subject<ActionEvent>();
  sourceEventSubjectObservable=this.sourceEventSubject.asObservable();

  //On peut encore separer :  les Actions de lecture : select search et l'autre on peut lui déleguer les actions de mise à jour
  // Avec cette méthode, on peut se passer de Redux ou de Ngrx
  sourceEventSubject2:Subject<ActionEvent>=new Subject<ActionEvent>();
  sourceEventSubjectObservable2=this.sourceEventSubject.asObservable();

  publishEvent(event:ActionEvent){
    this.sourceEventSubject.next(event);
  }
}
