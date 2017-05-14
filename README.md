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

###Visualizacion de imagenes
Basta con acceder ahttp://localhost:3000/images/anuncios/nombrefichero.png

Imágenes de los anuncios cargados con installDB:

http://localhost:3000/images/anuncios/estrella.png
http://localhost:3000/images/anuncios/sable.png
http://localhost:3000/images/anuncios/xwing.png
