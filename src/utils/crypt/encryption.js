import CryptoJS from "crypto-js";
export const encrypt = (data) => CryptoJS.AES.encrypt(data, process.env.ENCRYPT_KEY).toString();
export const decrypt =(data)=>CryptoJS.AES.decrypt(data , process.env.ENCRYPT_KEY);