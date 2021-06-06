import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { StartscreenComponent } from './startscreen/startscreen.component';

const routes: Routes = [
  {path: '', component: StartscreenComponent},
  {path: 'game/:id', component: GameComponent},
  {path: 'legal-notice', component: LegalNoticeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
