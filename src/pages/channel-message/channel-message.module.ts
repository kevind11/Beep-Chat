import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelMessagePage } from './channel-message';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ChannelMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelMessagePage),
    ComponentsModule
  ],
  exports:[
    ChannelMessagePage
  ]
})
export class ChannelMessagePageModule {}
