This docker script is used to build the docker image for the project. The docker image is used to run the project in a containerized environment. The docker image is built using the Dockerfile. The docker image is built using the following command:
```
#!/bin/sh

docker build -t pxt_microbit_build -f Dockerfile-yotta . 
```