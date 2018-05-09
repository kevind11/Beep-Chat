import { Profile } from "../profile/profile.interface";

export interface Message{

    user : Profile;
    date : number;
    message : string;
    key? : string;
    
}