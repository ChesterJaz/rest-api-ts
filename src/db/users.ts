import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication: {
        password: {type:String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false}
    }
})

export const userModel = mongoose.model('User', UserSchema)

//get all users
export const getUsers = () => userModel.find();

//get users by email
export const getUserByEmail = (email: string) => userModel.findOne({email})

//get user sess
export const getUsersSession = (sessionToken: string) => userModel.findOne({
    'authentication.sessionToken': sessionToken,
});

//get user by id
export const getUserById = (id: string) => userModel.findById(id);

//create a user
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());

//delete by id
export const deleteUserById = (id:string) => userModel.findOneAndDelete({_id: id});

//update id
export const updateUserById = (id: string, values: Record<string, any>) => userModel.findByIdAndUpdate(id, values);