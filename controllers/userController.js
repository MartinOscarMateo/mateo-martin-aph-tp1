import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret_key = process.env.SECRET_KEY;
const salt = 10;


const auth = async(request, response) =>{
    const { email, password } = request.body;
    const user = await User.findOne({email: email});

    if( !user){
        response.status(404).json({msg: "El usuario es invalido"});
    }
    
    const passOk = await bcrypt.compare(password, user.password);

    if( !passOk){
        //return 
        response.status(404).json({msg: "Contraseña invalida"});
    }
    // Creamos el token
    const data = {
        id: user._id,
        email: user.email
    }
    const jwt = jsonwebtoken.sign( data, secret_key, { expiresIn: '1h'} );

    response.json({msg: "Credenciales correctas", token: jwt})

}

const getUsers = async( request, response) =>{
    const users = await User.find();
    response.status(200).json( users);
}
const getUserById = async( request, response) => {
    const id = request.params.id;
    const user = request.body;

    const userNew = await User.findById(id, user );
    if ( userNew) {
        response.status(200).json( userNew );
    } else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}
const addUser = async(request, response) => {
    console.log("BODY:", request.body);
    const user = request.body;
    if(  !user.name || !user.email || !user.password){
        return response.status(403).json({msg: "Faltan parametro"});
    }
    console.log({user});
    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;
    const doc = new User(user);
    await doc.save();
    response.json( {msg: "Usuario creado", data: {id: doc._id, name: doc.name}} );
}

const updateUser =  async (request, response)=>{
    const id = request.params.id;
    const user =  request.body;

    const newUser = await User.findByIdAndUpdate(id, user,  { new: true} );

    console.log( {newUser} );
    if ( newUser) {
        response.json( { msg: 'Usuarios Actualizado', data :{newUser} } );
    } else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}

const deleteUser =  async (request, response) => {
    const id = request.params.id;
    const status = await User.findByIdAndDelete(id);
    console.log( {status} )
    if ( status) {
        response.json( {msg: 'Usuario eliminado'} );
    } else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}

export { getUsers, getUserById, addUser, updateUser, deleteUser, auth}
