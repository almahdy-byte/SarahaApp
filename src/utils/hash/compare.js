
import bcrypt from 'bcrypt'
export const compare= (password , hashedPassword) => bcrypt.compareSync(password,hashedPassword);