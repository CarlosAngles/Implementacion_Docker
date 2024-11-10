# Usar la imagen oficial de Node.js versión 23
FROM node:23

# Crear el directorio /home/app dentro del contenedor
RUN mkdir -p /home/app

# Copiar los archivos del proyecto desde el directorio actual al contenedor en /home/app
COPY . /home/app

# Exponer el puerto 3000 para que sea accesible desde fuera del contenedor
EXPOSE 3000

# Establecer el comando por defecto para ejecutar la aplicación Node.js
CMD ["node", "/home/app/index.js"]
