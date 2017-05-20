# Nodepop

###API para aplicación Nodepop. Práctica JS/Node.js/MongoDB Boot V.

API para la venta de artículos de segunda mano.

Esta API está disponible en español e inglés para su correcta interpretación de mensajes y errores. Se especifica con el parámetro **lang=EN** / **lang=ES**. Por defecto, el idioma seleccionado es español, pero los tags son devueltos en inglés.

En la versión 1 de esta API los usuarios deben estar registrados para poder hacer uso de ella. La autenticación se ha basado en JSON Web Token.

Base de datos utilizada: **MONGODB**. Se ha utilizado el módulo **mongoose** para la gestión de los modelos de base de datos.

## Cómo instalar

Descargar el proyecto:

```git clone http://github.com/gemambu/nodepop.git```

e instalarlo:

```cd nodepop```

```npm install```

Instalar base de datos:

```npm run installDB```

Si todo funciona correctamente, se mostrarán los siguientes mensajes:

```
> nodepop@0.0.0 installDB /Users/user/nodepop
> node ./lib/install_db.js

conexion establecida
Base de datos eliminada
Anuncios insertados correctamente.
Usuarios insertados correctamente.
Cerramos base de datos

```

Con esta instalación se añaden varios anuncios para su visualización y un usuario ya registrado para poder acceder a toda la información:

```
nombre: Vader
email: darthvader@sith.com
contrasela: "1234"

```

## Cómo arrancar el servicio

Esta API tiene dos posibles modos de arranque:

- Arranque normal: Se arranca en el puerto 3000.

	Ejecutar: ```npm start```


- Arranque debug: Se arranca en modo depuración en el puerto 4000.

	Ejecutar: ```npm run dev```


## Rutas

Una vez arrancado el servidor ya podemos comenzar a trabajar con la API. A continuación se definen las operaciones disponibles.

### Index


### Registro de usuario
Con este método se registra un nuevo usuario en la base de datos para poder acceder al resto de operaciones de la API.

- URL: /apiv1/registro
- Método: POST
- URL params: 
	- Opcional: 
		```lang=[ES/EN]```
		Ejemplo: *lang:EN*
- Body params:
	- Obligatorios:
		- ```name: [string]```Ejemplo: *name: Mi Nombre*
		- ```email: [string]```Ejemplo: *email: minombre@gmail.com*
		- ```key: [alphanumeric]```Ejemplo: *key: apassw0rd*
- Respuesta correcta:

```
{
  "success": true,
  "result": {
    "message": "Usuario creado correctamente",
    "username": "minombre@gmail.com"
  }
}
```

- Respuesta error:

```
{
  "success": false,
  "message": "Alguno de los parámetros introducidos no es válido"
}
```

### Autenticación


### Obtener tags


### Obtener anuncios


### Insertar anuncio












###Registro de usuario:
Método POST a: http://localhost:3000/apiv1/registro
with x-www-form-urlencoded
Campos: name, email y key.

// test123 -> 

##RUTAS

/apiv1/anuncios + filtros: GET, POST
/apiv1/tags GET
/apiv1/registro: POST
/apiv1/usuarios/authenticate POST
/apiv1/anuncios/nuevo POST
    campos: name, price, sale, photo, tags

###Visualizacion de imagenes
Basta con acceder a http://localhost:3000/images/anuncios/nombrefichero.png

Imágenes de los anuncios cargados con installDB:

http://localhost:3000/images/anuncios/estrella.png
http://localhost:3000/images/anuncios/sable.png
http://localhost:3000/images/anuncios/xwing.png

Pulsar sobre el enlace en postman, cargara la imagen en una nueva pestaña