import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProviderService } from '../services/provider.service';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSelect, IonSelectOption, IonTextarea, IonButton,
  IonList, IonItem, IonLabel, IonHeader, IonToolbar,
  IonTitle, IonContent
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonSelect, IonSelectOption, IonTextarea, IonButton,
    IonList, IonItem, IonLabel, IonHeader, IonToolbar,
    ReactiveFormsModule, IonTitle, IonContent, ExploreContainerComponent
  ]
})
export class Tab2Page implements OnInit {

  collectionName = 'reviews';
  dataList: any[] = [];

  myForm: FormGroup = new FormGroup({
    score: new FormControl('', Validators.required),
    opinion: new FormControl('', Validators.required)
  });

  constructor(private providerService: ProviderService) {}

  ngOnInit() {
    this.loadData();
  }

  onSubmit() {
    this.providerService.createDocument(this.collectionName, this.myForm.value).then(() => {
        this.myForm.reset()
    });
  }

  loadData() {
    this.providerService.readCollection(this.collectionName).subscribe((data) => {
        this.dataList = data;
    });
  }
}
