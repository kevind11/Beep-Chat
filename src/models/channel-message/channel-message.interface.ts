import { Profile } from "../profile/profile.interface";
export interface ChannelMessage{
    user : Profile;
    date : number;
    message : string;
    key? : string;

}