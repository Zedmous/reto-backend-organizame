const { v4:uuid4} =require('uuid')

class Usuario{
    id="";
    username="";
    password="";

    constructor(username,password){
        this.id=uuid4();
        this.username=username;
        this.password=password;
    }
}

module.exports=Usuario;
