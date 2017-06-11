# Nodepop
## Práctica JS/Node.js/MongoDB Boot V


# API para aplicación Nodepop. 


API para la venta de artículos de segunda mano.

El API está disponible en español e inglés para su correcta interpretación de mensajes y errores. Se especifica con el parámetro **lang=EN** / **lang=ES**. Por defecto, el idioma seleccionado es español, pero los tags son devueltos en inglés.

En la versión 1 de esta API los usuarios deben estar registrados para poder hacer uso de ella. La autenticación se ha basado en JSON Web Token.

Base de datos utilizada: **MONGODB**. Se ha utilizado el módulo **mongoose** para la gestión de los modelos de base de datos.


# Cómo instalar

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
nombre: nodepop
email: nodepop@kcv.com
contrasela: nodepopkcv

```


# Cómo arrancar el servicio

El API tiene dos posibles modos de arranque:

- Arranque producción: Se arranca en el puerto 3000.

	Ejecutar: ```npm start```


- Arranque debug: Se arranca en modo depuración en el puerto 5000. 

	Ejecutar: ```npm run dev```


# Cómo utilizar el API:

- Iodocs: Se ejecuta en el puerto 4000. Es necesario tener instalado redis (puerto 6379). Para utilizar esta herramienta, el servidor debe estar arrancado en modo debug (puerto 5000).

	Abrir una nueva consola y ejecutar: ```npm run iodocs```

	Abrir navegador web y acceder a: http://localhost:4000/

- Postman: Aplicación postman, se puede utilizar con el servidor en modo debug o modo producción.



# Rutas


Una vez arrancado el servidor ya podemos comenzar a trabajar con el API. A continuación se definen las operaciones disponibles.


# Index

Índice del API. Mismo contenido README en html.


# Registro de usuario

Con este método se registra un nuevo usuario en la base de datos para poder acceder al resto de operaciones del API.

- URL: /apiv1/registro
- Método: POST
- Formulario: x-www-form-urlencoded
- URL params: 
	- Opcional: 
		```lang=[ES/EN]```
		Ejemplo: *lang=EN*
- Body params:
	- Obligatorios:
		- ```name: [string]```Ejemplo: *name: Mi Nombre*
		- ```email: [string]```Ejemplo: *email: minombre@gmail.com*
		- ```key: [alphanumeric]```Ejemplo: *key: apassw0rd*
- Respuesta correcta:

	**Código:** 200 OK
	
	**Contenido:**
	
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

	**Código:** 403 Forbidden
	
	**Contenido:**
	
	```
	{
	  "success": false,
	  "message": "Alguno de los parámetros introducidos no es válido"
	}
	```


# Autenticación

Un usuario registrado debe autenticarse en el servicio para obtener el token de seguridad que le permite acceder a todas las funcionalidades disponibles. Sin esta autenticación, el API no devolverá información.

- URL: /apiv1/usuarios/authenticate
- Método: POST
- Formulario: x-www-form-urlencoded
- URL params: 
	- Opcional: 
		```lang=[ES/EN]```
		Ejemplo: *lang=EN*
- Body params:
	- Obligatorios:
		- ```email: [string]```Ejemplo: *email: minombre@gmail.com*
		- ```key: [alphanumeric]```Ejemplo: *key: apassw0rd*
- Respuesta correcta:


	**Código:** 200 OK
	
	**Contenido:**
	
	```
	{
	  "success": true,
	  "result": {
	    "message": "Login correcto",
	    "token": "eyJhbGciOiJIUzI1Ni...fgCH33nJhZ-tgxo"
	  }
	}
	```

- Respuesta error:


	**Código:** 403 Forbidden
	
	**Contenido:**

	```
	{
	  "success": false,
	  "error": "Alguno de los parámetros introducidos no es válido"
	}
	```
	OR

	**Código:** 401 Unauthorized
	
	**Contenido:**

	```
	{
		"success": false,
		"error": "Usuario no encontrado"
	}
	```
	OR
	
	**Código:** 401 Unauthorized
	
	**Contenido:**
	
	```
	{
	  "success": false,
	  "error": "La contraseña no es correcta"
	}
	```



# Obtener tags

Esta operación permite obtener los tags existentes en base de datos.

- URL: /apiv1/tags
- Método: GET
- URL params: 
	- Obligatorio:
		```token=[alphanumerico]```
		
		Ejemplo: *token	=asdf12385*
	
	- Opcional: 
		```lang=[ES/EN]```
		
		Ejemplo: *lang=EN*
- Body params: No aplica
	
- Respuesta correcta:


	**Código:** 200 OK
	
	**Contenido:**
	
	```
	{
	  "success": true,
	  "tags": [
	    "lifestyle",
	    "mobile",
	    "motor",
	    "work"
	  ]
	}
	```

- Respuesta error:


	**Código:** 401 Unauthorized
	
	**Contenido:**

	```
	{
	  "success": false,
	  "message": "Este método necesita token de autenticación"
	}
	```
	OR
	
	**Código:** 401 Unauthorized
	
	**Contenido:**
	
	```
	{
	  "success": false,
	  "message": "El token de autenticación no es válido"
	}
	```



# Obtener anuncios

Esta operación permite obtener los anuncios publicados en nodepop. Se pueden aplicar diferentes filtros, paginados y ordenación.

- URL: /apiv1/anuncios
- Método: GET
- URL params: 
	- Obligatorio:
		```token=[alphanumerico]```
		
		Ejemplo: *token	=asdf12385*
	
	- Opcional: 

		- ```lang=[ES/EN]```
		
			Ejemplo: *lang=EN*
		
		**Filtros:**
		
		- Por nombre de anuncio: ```nombre=[string]```
		
			Ejemplo: *nombre=Es*
		
		- Por precio: ```precio=[numero]```
		
			- Ejemplo: *precio=50* (Devuelve los anuncios con precio exacto: 50)
				
			- Ejemplo: *precio=50-* (Devuelve los anuncios con precio mayor o igual a: 50)
				
			- Ejemplo: *precio=-50* (Devuelve los anuncios con precio menor o igual a: 50)
				
			- Ejemplo: *precio=50-100* (Devuelve los anuncios con precio incluido entre: 50 y 100)

		- Por venta o búsqueda: ```venta=[true/false]```
		
			Ejemplo: *venta=true*
			
		- Por tags del anuncio. Opciones: *work, lifestyle, motor y mobile*: ```tag=[string]```
	
			Ejemplo: *tag=mobile*

		- Inicio de visualización: ```start=[numero]```
	
			Ejemplo: *start=1*		
			
		- Límite de anuncios a mostrar: ```limit=[numero]```
			
			Ejemplo: *limit=5*	
				
		- Ordenación de la lista por un campo. Opciones: *nombre, precio, venta, foto, tags* (también se pueden incluir los nombres en inglés: *name, price, sale, photo, tags*): ```sort=[nombre]```
			
			Ejemplo: *sort=precio*

			Ejemplo: *sort=name*	
				
		- Mostrar el total de anuncios en base de datos: ```includeTotal=[true/false]```
			
			Ejemplo: *includeTotal=false*	

- Body params: No aplica
	
- Respuesta correcta:


	**Código:**  200 OK
	
	**Contenido:**
	
	```
	{
	  "success": true,
	  "totalPublished": 7,
	  "result": [
	    {
	      "_id": "592026419d37d7921a299d97",
	      "name": "Traje Stormtrooper",
	      "price": 1000,
	      "tags": [
	        "lifestyle",
	        "work"
	      ]
	    }
	  ]
	}
	```
	
	OR

	**Código:** 200 OK
	
	**Contenido:**
	
	```
	{
	  "success": true,
	  "message": "La búsqueda no ha devuelto resultados",
	  "result": []
	}
	```
	
- Respuesta error:


	**Código:** 401 Unauthorized
	
	**Contenido:**

	```
	{
	  "success": false,
	  "message": "Este método necesita token de autenticación"
	}
	```
	OR
	
	**Código:** 401 Unauthorized
	
	**Contenido:**
	
	```
	{
	  "success": false,
	  "message": "El token de autenticación no es válido"
	}
	```

## Visualización de imagenes
Basta con acceder a http://localhost:3000/images/anuncios/*nombrefichero*.png



# Insertar anuncio

Esta operación permite insertar un anuncio en nodepop. 

- URL: /apiv1/anuncios/nuevo
- Método: POST
- Formulario: x-www-form-urlencoded
- URL params: 
	- Obligatorio:
		```token=[alphanumerico]```
		
		Ejemplo: *token=asdf12385*
	
	- Opcional: 

		- ```lang=[ES/EN]```
		
			Ejemplo: *lang=EN*
	
- Body params:	
	
	- Nombre del anuncio: ```name:[string]```
	
		Ejemplo: ```name: Gafas Neo```
		
	- Precio del artículo: ```price=[numerico]```

		Ejemplo: ```price: 1230```
		
	- Artículo para búsqueda o venta: ```sale: [true/false]```

		Ejemplo: ```sale: true```
		
	- Foto del artículo: ```photo: [alphanumeric]```

		Ejemplo: ```photo: neo_glassess.png```
		
	- Tags del anuncio. Opciones: Opciones: *work, lifestyle, motor y mobile* : ```tags: [string]```

		Ejemplo: ```tags: lifestyle,work```	
					
- Respuesta correcta:


	**Código:**  200 OK
	
	**Contenido:**
	
	```
	{
	  "success": true,
	  "message": "Anuncio insertado correctamente",
	  "result": {
	    "__v": 0,
	    "name": "Gafas Neo",
	    "sale": true,
	    "price": 1230,
	    "photo": "/images/anuncios/neo_glassess.png",
	    "_id": "59207cb5135e499ad28220b9",
	    "tags": [
	      "lifestyle",
	      "work"
	    ]
	  }
	}
	```

- Respuesta error:


	**Código:** 401 Unauthorized
	
	**Contenido:**

	```
	{
	  "success": false,
	  "message": "Este método necesita token de autenticación"
	}
	```
	OR
	
	**Código:** 401 Unauthorized
	
	**Contenido:**
	
	```
	{
	  "success": false,
	  "message": "El token de autenticación no es válido"
	}
	```

	OR
	
	**Código:** 401 Unauthorized
	
	**Contenido:**
	
	```
	{
	  "success": false,
	  "error": "Alguno de los parámetros introducidos no es válido"
	}
	```

## Práctica Devops Boot V


- Servidor nodepop desplegado en: **gnodepop.styleapps.es**

- Página estática: desplegada en **gemambu.styleapps.es**


He optado por esta solución (crear dos subdominios) porque decidí reutilizar un dominio que ya tenía comprado y utilizado para otros proyectos personales, espero que no reste puntos :-)

Ambos subdominios apuntan a la misma IP estática (**34.226.71.88**), tal y como vimos durante el módulo. 

La plataforma de hosting utilizada es AWS. En esta plataforma he instalado pm2, nginx y se ha modificado el puerto SSH.


### Página estática personal (https://gemambu.styleapps.es)

La página tiene certificado SSL y muestra el contenido estático personalizado. La plantilla original es de https://startbootstrap.com.

Si se intenta acceder a un path diferente, se mostrará el error correspondiente.

Si se accede a través de la IP estática, automáticamente se redirige a la página estática, así como si se intenta acceder por http.


### Nodepop (https://gnodepop.styleapps.es)

También está certificado con SSL y si se accede vía URL se muestra el contenido de este mismo fichero *README.md*. 
Este fichero se sirve gracias a la librería StrapDown (http://strapdownjs.com/).

Al igual que la página estática, si se accede a un path que no existe se retorna el error correspondiente.

Para acceder a los anuncios alojados en el servidor se puede utilizar *Postman*. A continuación se muestra un listado con las operaciones disponibles. Completar los parámetros de path y body con la información correspondiente detallada en el apartado anterior de este mismo *readme.md*.

- Registro:

```https://gnodepop.styleapps.es/apiv1/usuarios/registro```

- Autenticación:

```https://gnodepop.styleapps.es/apiv1/usuarios/authenticate```


- Obtener Tags:

```https://gnodepop.styleapps.es/apiv1/tags```


- Obtener anuncios:

```https://gnodepop.styleapps.es/apiv1/anuncios?token=abdc...1234...xyz```


- Subir anuncio:

```https://gnodepop.styleapps.es/apiv1/anuncios/nuevo```



Por último, si se desean revisar las imágenes alojadas, se puede comprobar con la siguiente ruta:

```https://gnodepop.styleapps.es/images/estrella.png```


