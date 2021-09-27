import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomPartComponent } from './custom-part/custom-part.component';
import { MakeModelComponent } from './make-model/make-model.component';
import { PartAssemblyComponent } from './part-assembly/part-assembly.component';
import { PartCatalogComponent } from './part-catalog/part-catalog.component';
import { SetCompareComponent } from './set-compare/set-compare.component';

const routes: Routes = [
  { path: '', component: PartAssemblyComponent },
  { path: 'custom-part', component: CustomPartComponent },
  { path: 'make-model', component: MakeModelComponent },
  { path: 'part-catalog', component: PartCatalogComponent },
  { path: 'set-compare', component: SetCompareComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
