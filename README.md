# Nodepop


## instrucciones de uso

##iniciar la base de datos
Abrir un terminal y ejecutar: npm run installDB. Si todo funciona correctamente, se mostrarán los siguientes mensajes:

```
> nodepop@0.0.0 installDB /Users/gema/Documents/BTC code/cursonode/nodepop
> node ./lib/install_db.js

Conexión establecida con la base de datos
Anuncios insertados correctamente
Usuarios insertados correctamente
Finalizado correctamente

```

### como arrancar el proyecto
### como inicializar la base de datos

###Registro de usuario:
Método POST a: http://localhost:3000/apiv1/registro
Campos: name, email y key.

##RUTAS

/apiv1/anuncios + filtros: GET, POST
/apiv1/tags GET
/apiv1/registro: POST
/apiv1/usuarios/authenticate POST

###Visualizacion de imagenes
Basta con acceder a http://localhost:3000/images/anuncios/nombrefichero.png

Imágenes de los anuncios cargados con installDB:

http://localhost:3000/images/anuncios/estrella.png
http://localhost:3000/images/anuncios/sable.png
http://localhost:3000/images/anuncios/xwing.png

Pulsar sobre el enlace en postman, cargara la imagen en una nueva pestaña
