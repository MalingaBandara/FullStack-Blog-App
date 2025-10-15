
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = function ( passport ){

    passport.use(
         new LocalStrategy( 
            { usernameField: 'email' },
            async( email, password, done )=> {


                try {

                    const user = await User.findOne({ email });

                    if( !user ){
                        return done( null, false, { message: 'No user with that email' } );
                    }


                    const isMatch = await bcrypt.compare( password, user.password );

                    if( !isMatch ){
                        return done( null, false, { message: 'Password incorrect' } );
                    }
                    
                    return done( null, user );
                    
                    
                } catch (error) {
                    
                    return done( error );

                }

            }
        )   
    );


    passport.serilizeUser( function( user, done ){
        done( null, user.id );
    });


    passport.deserializeUser( async function (id, done) {

        try {
            
        } catch (error) {
            
        }
        
    });

};


