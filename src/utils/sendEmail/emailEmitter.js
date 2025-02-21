import EventEmitter from 'events';
import { sendEmail } from './sendEmail.js';

export const subjects = {
    confirmMail : 'Confirm Account',
    resetPassword : 'Reset Password'
  }

  Object.freeze(subjects)
export const emailEmitter = new EventEmitter();

emailEmitter.on('confirmEmail',async({to , subject ,text ,html})=>{
    await sendEmail({to , subject ,text ,html})
})

emailEmitter.on('resetPassword',async({to , subject ,text ,html})=>{
    await sendEmail({to , subject ,text ,html})
})