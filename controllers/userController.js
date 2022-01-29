const {
    User
} = require('../models');

//we are exporting an object with many functions
module.exports = {
    createUser: async (req, res) => {
        const { username, email, password } = req.body;
        if(!username || !password || !email){
            return res.status(400).json({error: "you must provide a username, email and password"});
        }
        try {
            const user = await User.create({
                username, 
                email, 
                password,
            });
           // res.json(user) 
           //we dont want to use json when using handlebars, you "render" a page instead
           res.render('allUsers', { //you dont need to say handlebars here, 
                                 //just say the specific handlebars file you want to render
                users,
                favoriteFood: 'ice cream sandwhich',

            })
        } catch (error) {
            res.json(error)
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const usersData = await User.findAll({});

            const users = usersData.map(user => user.get({ plain: true}))
             res.render('allUsers', { 
                users,
                favoriteFood: 'ice cream sandwhich',
                
            })
        } catch (error) {
            res.json(error);
        }
    },
    getUserById: async (req, res) => {
        try {
            const userData = await User.findByPk(req.params.userId);
            const user = userData.get({ plain: true}); //this is preventing us from recieving all of the info included in the json, so we only recieve the data for this user we're searching for
            res.render('singleUser', {
                user
            });
        } catch (error) {
            res.json(error)
        };
    },
}

