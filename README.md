```text
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   └── dtos/
│       ├── create-user.dto.ts
│       ├── login-user.dto.ts
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── dtos/
│   │   └── update-user.dto.ts
├── prisma/
│   └── prisma.module.ts
│   └── prisma.service.ts
├── app.module.ts
└── main.ts
```


Step 1: Stop all running containers
To stop all running containers (including your NestJS application and PostgreSQL), use the following command:

```bash
docker-compose down
```
This will stop and remove the containers, networks, and volumes created by Docker Compose.

Step 2: Restart the containers
To restart the containers (rebuild them if necessary), run:

```bash
docker-compose up -d
```
This will:
Rebuild the Docker images if there were any changes.
Start the services in detached mode (-d), meaning they will run in the background.
Step 3: Check if containers are running
You can confirm that your services are up and running by listing the active Docker containers:

```bash
docker ps
```
This will show you the status of all running containers, including the NestJS app and PostgreSQL.

Step 4: View logs of the NestJS app
To check the logs of your NestJS app after starting it, use:

```bash
docker logs nestjs-app
```
This will display the logs for the nestjs-app container.

Optional Step: Stop containers but keep volumes
If you want to stop the containers but keep the volumes (so the data persists), use:

```bash
docker-compose stop
```
This will stop the containers but not remove the volumes. You can restart the containers later using:

```bash
docker-compose start
```
## Summary of Commands:
### Stop containers:
```bash
docker-compose down
```

### Start containers:
```bash
docker-compose up -d
```

### Check running containers:
```bash
docker ps
```

### View logs of the app:
```bash
docker logs nestjs-app
```

### To open prisma studio
```bash
npx prisma studio
```