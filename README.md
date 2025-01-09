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