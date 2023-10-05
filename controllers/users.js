const { Prisma } = require(".prisma/client");
const {bcrypt} = require('bcrypt');
const jwt = require('jsonwebtoken');
/* GET users listing. /api/user/login */
const login = async function(req, res, ) {

    const {email,password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "Please fill in the form"})
    }

    const user = await Prisma.user.findFirst({
        where: {
            email: email,

        }
    })

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))

    if (user && isPasswordCorrect) {
        res.status(200).json({id: user.id, email: user.email, name: user.name})
    } else {
        return res.status(400).json({message: "Login or password has not been found"})
    }

    
  };
  /*
  .*. @route POST  /api/user/register 
      @desc Registration
      @access Public 
  */
const register =  async function(req, res, ) {
    
    const {email, password, name} = req.body;
    
    if (!email || !password || !name) {
        res.statusCode = 400
        return res.json({message: "Please fill in the required fields"})
    }

    const regUser = await Prisma.user.findFirst({
        where: {
            email: email,
        }
    })

    if (regUser) {
        res.statusCode = 400
        return res.json({message: "Email has been already registred"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user =  await Prisma.user.create({
        data: {
            email:email,
            name: name,
            password: hashedPassword 
        }
    })

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
        res.statusCode = 201
        res.json({
            id: user.id, 
            email: user.email, 
            name: user.name, 
            token: jwt.sign({id: user.id}, secret, {expiresIn: '30d'}) 
        })
    } else {
        res.statusCode = 400
        return res.json({message: "Could not register user"})
    } ;

 }
  /*/api/user/current */
const current = async function(req, res, ) {
    res.send('current');
  };

  module.exports = {login, current, register}