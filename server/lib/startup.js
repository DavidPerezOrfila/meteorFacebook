Meteor.startup(function(){
    var users = Meteor.users.find().count();
    if(!users) {
        for(var i = 0; i < 100; i++){
            HTTP.call('GET', "https://api.randomuser.me/0.7/?nat=es", {data:{ some:'json', stuff:1}},function(err,res){
                var fields = res.data.results[0].user;
                delete fields.login.password;
                delete fields.login.salt;
                delete fields.loginmd5;
                delete fields.login.sha1;
                delete fields.login.sha256;
                delete fields.login.registered;
                delete fields.login.dob;
                delete fields.login.HETU;
                delete fields.login.INSEE;
                delete fields.login.version;
                var user = {
                    username: fields.login.username,
                    email: fields.login.email,
                    password:"password",
                    profile: fields
                }
                Accounts.createUser(user);
                console.log(fields);
            })
        }
    }


})
