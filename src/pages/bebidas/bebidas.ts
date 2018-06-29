import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators';
import { Bebida} from '../../commons/bebida'

@Component({
  selector: 'page-bebidas',
  templateUrl: 'bebidas.html',
})
export class BebidasPage {
  
  private itemsCollection: AngularFirestoreCollection<Bebida>; 
  platillos: Observable<Bebida[]>; 

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Bebida>('bebidas');
    this.platillos = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Bebida;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );   
}

}
