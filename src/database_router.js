const router ={}
const logger = require('../lib/log')(__filename)
const dbModule = require('../sequelize/db')

router.patch =  async(req,res)=>{
    const {setDBPassword} = require('../lib/users')
    //how to connect userId with user obj & userInfo?
    if(req.params.id===null ||!req.body.password ){
        logger.error('invalid input')
        return res.status(400).json({error:{message:'invalid input of userid and password'}})
    }
    
    const {Accounts} = dbModule.getModels()
    const userAccount = await Accounts.findOne({
        where:{
            id:req.params.id
        }
    })

    if(!userAccount){
        logger.error(`account does not exist`)
        res.status(400).json({error:{message:"account does not exist"}})
        return
    }
    try {
        await setDBPassword(userAccount,req.body.password) 
        logger.info(`user ${userAccount.id} updates password`)
        return res.status(200).json('success')
      } catch (err) {
        logger.error('Password update failed. Please try again',req.params.id, err)
        return res.status(500).json({error: {message: 'Password update failed. Please try again'}})
      }
}


module.exports=router
