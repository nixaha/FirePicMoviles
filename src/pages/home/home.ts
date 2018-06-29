import { Component  } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators';
import { Platillo} from '../../commons/platillo'
import { BebidasPage } from '../../pages/bebidas/bebidas';
import { VistaPage } from '../../pages/vista/vista';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bebi:any = BebidasPage;
  vista:any = VistaPage;

  private itemsCollection: AngularFirestoreCollection<Platillo>;

  platillos: Observable<Platillo[]>;

  constructor(private readonly afs: AngularFirestore, public modalCtrl: ModalController, public navCtrl: NavController) {

                this.itemsCollection = afs.collection<Platillo>('platillos');
                this.platillos = this.itemsCollection.snapshotChanges().pipe(
                  map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Platillo;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  }))
                );   
  }
  
  detalles(platillo: Platillo){
    this.navCtrl.push(VistaPage, {
      id: platillo
    })
  }
}
