# Mugetsu — Веборієнтована система кіберспортивної організації

**Mugetsu** — це сучасна веборієнтована система для кіберспортивної організації, яка дозволяє користувачам переглядати новини, матчі (live, майбутні та завершені), турніри, інформацію про команди та медіа. Адміністратори мають змогу керувати контентом (додавати, редагувати, видаляти). Реалізовано автентифікацію через електронну пошту та GitHub із підтримкою ролей користувачів.

## Технології
Для створення **Mugetsu** використано сучасний стек технологій, що забезпечує високу продуктивність, масштабованість та зручність розробки:

- Next.js 15 (React-based фреймворк для серверного рендерингу, статичної генерації та API-маршрутів)
- TypeScript (статична типізація для підвищення надійності коду)
- Tailwind (утиліта для швидкої та гнучкої стилізації)
- Shadcn (набір компонентів на основі Tailwind для створення сучасного UI)
- PostgreSQL (реляційна база даних, хостинг через Railway)
- Drizzle ORM (легка та типобезпечна ORM для роботи з PostgreSQL)
- Vercel Blob Store (зберігання зображень та інших медіа)
- NextAuth.js (автентифікація через email/пароль із хешуванням та OpenID Connect через GitHub)
- JWT (керування сесіями)
- Sentry.io (інтеграція з модулями Tracing та Session Replay для відстеження помилок, продуктивності та поведінки користувачів)
- Server Actions (`"use server"`) для асинхронних CRUD-операцій
- Visual Studio Code (середовище розробки)
- GitHub Actions (автоматизація CI/CD з перевірками ESLint, Prettier, TypeScript)
- Vercel (автоматичне розгортання з завантаженням source maps до Sentry)
- Middleware для захисту API-запитів

## Встановлення та запуск

### 1. Клонування репозиторію
```bash
git clone <your-repo-url>
cd mugetsu
```

### 2. Встановлення залежностей
```bash
npm install
```

### 3. Налаштування змінних середовища
Створіть файл `.env` у корені проєкту та додайте наступні змінні:
```
DATABASE_URL=
SESSION_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=
GITHUB_CLIENT_ID=
GITHUB_ID=
GITHUB_SECRET=
```

### 4. Налаштування бази даних
1. Переконайтеся, що PostgreSQL встановлено та запущено.
2. Створіть базу даних:
   ```bash
   psql -U postgres -c "CREATE DATABASE mugetsu;"
   ```
3. Згенеруйте та застосуйте міграції:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```
   Або для швидкого оновлення схеми:
   ```bash
   npm run db:push
   ```

### 5. Запуск проєкту
- Для розробки:
  ```bash
  npm run dev
  ```
  Проєкт буде доступний за адресою **http://localhost:3000**.
- Для продакшену:
  ```bash
  npm run build
  npm run start
  ```

### 6. Додаткові команди
- Лінтинг коду:
  ```bash
  npm run lint
  ```
- Форматування коду:
  ```bash
  npm run format
  ```
- Перевірка типів:
  ```bash
  npm run type-check
  ```
- Запуск тестів:
  ```bash
  npm run test
  ```

## Ліцензія
Цей проєкт ліцензовано під [MIT License](./LICENSE).

## Автор
**Marianzzz** - [GitHub профіль](https://github.com/Marianzzz)

