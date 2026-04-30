# Deploy

## Overview

Проект хранится в GitHub-репозитории `mobile-portfolio-react`.

Основной рабочий сценарий:
1. Разработка ведется в ветке `dev`
2. После проверки изменения переводятся в `main`
3. `main` деплоится в Vercel

Production-домен:
`https://kirilkin.vercel.app`

## Git Workflow

Используем ветки:
- `dev` - рабочая ветка для новых изменений
- `main` - стабильная ветка для production

Рекомендуемый порядок:
1. Внести изменения в `dev`
2. Проверить проект локально
3. Перенести изменения из `dev` в `main`
4. Запустить production deploy в Vercel

## Local Checks Before Deploy

Перед деплоем желательно выполнить:
- `npm.cmd run lint`
- `npm.cmd run build`

Если PowerShell блокирует `npm`, использовать `npm.cmd`.

## GitHub

Remote repository:
`https://github.com/dkirilkin/mobile-portfolio-react.git`

Базовый сценарий публикации:
1. Закоммитить изменения в `dev`
2. Запушить `dev`
3. Сделать merge `dev -> main`
4. Запушить `main`

## Vercel

Vercel project:
`mobile-portfolio-react`

Production domain:
`https://kirilkin.vercel.app`

Если проект уже привязан к Vercel, production deploy можно запускать из корня проекта:
`npx.cmd vercel --prod --yes`

Если локальная папка еще не связана с проектом Vercel:
`npx.cmd vercel link --yes --project mobile-portfolio-react`

## Notes

- Папка `.vercel` не должна попадать в репозиторий
- Изменения в production должны попадать через `main`
- Если домен меняется, обновить этот файл
