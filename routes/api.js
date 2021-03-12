'use strict';

const mongoose = require('mongoose')

var User;
var userSchema = {  
  assigned_to:{type:String},
  status_text:{type:String},
  open:{type:Boolean},
  issue_title:{type:String, required:true},
  issue_text:{type:String, required:true},
  created_by:{type:String, required:true},
  created_on:{type:Date},
  updated_on:{type:Date}
}
User = mongoose.model('User', userSchema);


module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      
      let rec = {...req.body, open:true, created_on: new Date, updated_on:new Date };
      //console.log(rec);
      //let doc = {user: rec};
      let user = new User(rec);
      user.save().then(()=>{
        console.log("Record Created!")
        let sendRec = {...user._doc};
        delete sendRec["__v"]
        console.log(sendRec);
        res.send(sendRec);
      })
      .catch((error)=>console.log("error encountered: ", error));
       
      
    })
    
    .put(function (req, res){
      let project = req.params.project;
      console.log(req.body);

      let update = {...req.body};
      let filter = {_id:update["_id"]};

      User.findOneAndUpdate(filter, update)
          .then(()=>{
            res.send({"result":"successfully updated","_id":update["_id"]})       
          })
          .catch((error)=>console.log("error encountered: ", error));

    })
    
    .delete(function (req, res){
      let project = req.params.project;
      console.log("JAUDA SARKAR", req.body);
      
      let rem = {...req.body};
      User.deleteOne({ _id: rem["_id"] }, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
        res.send({"result":"successfully deleted","_id":rem["_id"]}
        )
      });
      

    });
    
};
