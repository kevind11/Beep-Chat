import { USER_LIST } from "../profile/profile";
import { Message } from "../../models/message/message.interface";


const userList = USER_LIST;

const messageList : Message [] = [];

userList.forEach((user) =>{
    messageList.push({user : user, date : new Date().getTime(), message : 'Hello there!!!'});
});

export const MESSAGE_LIST = messageList; 