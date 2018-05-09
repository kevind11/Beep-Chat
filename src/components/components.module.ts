import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form';
import { IonicModule } from 'ionic-angular/module';
import { RegisterFormComponent } from './register-form/register-form';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { ProfileViewComponent } from './profile-view/profile-view';
import { ProfileSearchComponent } from './profile-search/profile-search';
import { SendMessageBoxComponent } from './send-message-box/send-message-box';
import { DirectivesModule } from '../directives/directives.module';
import { ChatMessageComponent } from './chat-message/chat-message';
import { LastMessageComponent } from './last-message/last-message';
@NgModule({
	declarations: [LoginFormComponent,
    RegisterFormComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    ProfileSearchComponent,
    SendMessageBoxComponent,
    ChatMessageComponent,
    LastMessageComponent],
    imports: [IonicModule,
    DirectivesModule],
	exports: [LoginFormComponent,
    RegisterFormComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    ProfileSearchComponent,
    SendMessageBoxComponent,
    ChatMessageComponent,
    LastMessageComponent]
})
export class ComponentsModule {}
