# COMANDOS GIT
```
git init
git add .
git commit -m "Proyecto Base"

git remote add origin <direccion_remota_github>
git push origin master
```
## Creamos la rama develop
```
git checkout -b develop
git push -u origin develop
```

## Git flow
```
git flow init
```
### Crear una nueva funcionanlidad
```
git flow feature start add-config-rest

git flow feature finish add-config-rest
```