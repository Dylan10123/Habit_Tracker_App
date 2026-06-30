import { Schema, model } from 'mongoose';

// Lo primero que creo es una interfaz que defina los datos que contiene el usuario
interface IUser extends Document {
  // La interfaz extiende de Document para que TS sepa que es un documento de Mongoose
  name: string;
  email: string;
  passwordHash: string;
}

// Lo siguiente es crear un esquema que le diga a Mongoose la estructura del documento
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

// Finalmente creo el modelo utilizando la función model()
const User = model<IUser>('User', userSchema);

export default User;
