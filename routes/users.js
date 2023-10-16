const router = express.Router();
const User = require('../models/user');
const { remove} = require('../models/user')

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res, next) => {
    res.send(req.body)
})
module.exports=router;