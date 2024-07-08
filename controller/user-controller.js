 
import User from '../model/user.js';
import Token from '../model/token.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
export const signupUser = async (request, response) => {
    
    try {
        
      
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const userb = {
            username: request.body.username,
            name: request.body.name,
            password: hashedPassword
        };
        const newUser = new User(userb);
        await newUser.save();
        
        //console.log('User saved successfully'); 
       return  response.status(200).json({ message: 'Signup successful' });
    } catch (error) {
      console.error('Error in /signup:', error);
    return  response.status(500).json({ message: 'Internal Server Error' });
    }
};
export const loginUser = async (request, response) => {
    let user=await User.findOne({username:request.body.username});
        if(!user)
            {
                return  response.status(400).json({ message: 'Username doesnt matched' });
            }
      try{
        let mat= await bcrypt.compare(request.body.password,user.password);
        if(mat)
            {
                const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
                const refresToken=jwt.sign(user.toJSON(),process.env.REFRES_SECRET_KEY);
                const newT=  new Token({token:refresToken}) 
                await newT.save();
                return  response.status(200).json({accessToken:accessToken,refresToken:refresToken ,name:user.name,username:user.username});
            }
            else{
                return  response.status(400).json({ message: 'Username doesnt matched' }); 
            }
      }catch(error)
         {
      return  response.status(500).json({ message: ' Error While login by user' });
      }
    
    
    
};
