const express = require('express'); //Requerimos express
const app = express(); //Activamos la librería express
const PORT = 3000; //Declaramos el puerto que levanta el servidor
const cors = require('./middlewares/cors');//requerir el archivo corss para que funcione el frontend


//Requerimos archivos users que está dentro de routes y pasándolo a la función UserRouter
const UserRouter = require('./routes/users'); 
const MovieRouter = require('./routes/movies'); 

app.use(express.json()); //Activar paquete Json para que lo devuelva

app.use(express.urlencoded({ extended: true })); //Activa urlencoded

app.use('/users', UserRouter); //Función que le pasamos a la ruta con la lógica. 
app.use('/movies', MovieRouter); // 

app.use(cors);//llamar a la funcion cors para permitir el acceso al frontend



//Listener para levantar el servidor
app.listen(PORT,() => console.log('server running :D en puerto ' + PORT));