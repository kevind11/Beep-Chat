import { Profile } from "../../models/profile/profile.interface";


const users: Profile[] = [
    { firstName: 'Kevin', lastName: 'Djajadinata', avatar: 'assets/imgs/avatar.png', email: 'kevin.dj97@gmail.com', dateOfBirth: new Date() },
    { firstName: 'Michael', lastName: 'Antony', avatar: 'assets/imgs/avatar.png', email: 'kevin.dj97@gmail.com', dateOfBirth: new Date() },
    { firstName: 'Davin', lastName: 'Santoso', avatar: 'assets/imgs/avatar.png', email: 'kevin.dj97@gmail.com', dateOfBirth: new Date() },
    { firstName: 'Andreas', lastName: 'Christian', avatar: 'assets/imgs/avatar.png', email: 'kevin.dj97@gmail.com', dateOfBirth: new Date() }
];

export const USER_LIST = users;

