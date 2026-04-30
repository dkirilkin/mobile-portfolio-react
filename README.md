# Mobile Portfolio

Портфолио мобильного разработчика на `Next.js`.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Local Start

```bash
npm.cmd install
npm.cmd run dev
```

Приложение будет доступно на `http://localhost:3000`.

Если PowerShell блокирует `npm`, используем `npm.cmd`.

## Checks

Перед публикацией желательно выполнить:

```bash
npm.cmd run lint
npm.cmd run build
```

## Project Structure

- Главная страница и страницы проектов построены на общей модели данных `Project`
- Контент проектов хранится отдельно от UI-компонентов
- Разработка идет от шаблона страницы проекта к остальным кейсам и затем к главной странице

## Docs

- Правила проекта: [AGENTS.md](/d:/Portfolio%20Development/mobile-portfolio/AGENTS.md:1)
- Деплой и workflow: [docs/deploy.md](/d:/Portfolio%20Development/mobile-portfolio/docs/deploy.md:1)
- Модель данных проекта: [src/types/project.ts](/d:/Portfolio%20Development/mobile-portfolio/src/types/project.ts:1)
