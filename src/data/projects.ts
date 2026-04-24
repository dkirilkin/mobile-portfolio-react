import { Project } from "@/types/project";

function createScreenshots(
  projectSlug: string,
  files: string[],
  title: string,
) {
  return files.map((file, index) => ({
    src: `/projects/${projectSlug}/${file}`,
    alt: `${title} - экран ${index + 1}`,
  }));
}

const placeholderDemoAccessHTML = `
  <div class="demo-section">
    <h3 class="demo-heading">Демо-вход</h3>
    <p class="demo-meta">
      Блок с доступом к демо и дополнительными действиями будет добавлен позже.
    </p>
  </div>
`.trim();

const ecommerceDemoAccessHTML = `
  <div class="demo-section">
    <h3 class="demo-heading">Демо-вход</h3>

    <div class="demo-copy-row" data-copy="test@test.com">
      <span class="demo-copy-label">Email:</span>
      <span class="demo-copy-value">test@test.com</span>
      <button
        class="demo-copy-button"
        type="button"
        aria-label="Скопировать email"
        data-copy="test@test.com"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="10" height="10" rx="2"></rect>
          <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>

    <div class="demo-copy-row" data-copy="test1234">
      <span class="demo-copy-label">Пароль:</span>
      <span class="demo-copy-value">test1234</span>
      <button
        class="demo-copy-button"
        type="button"
        aria-label="Скопировать пароль"
        data-copy="test1234"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="10" height="10" rx="2"></rect>
          <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  </div>

  <div class="demo-section">
    <h3 class="demo-heading">Ю-Касса (оплата)</h3>

    <div class="demo-copy-row" data-copy="5555555555554477">
      <span class="demo-copy-label">Тестовая карта:</span>
      <span class="demo-copy-value">5555 5555 5555 4477</span>
      <button
        class="demo-copy-button"
        type="button"
        aria-label="Скопировать номер карты"
        data-copy="5555555555554477"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="10" height="10" rx="2"></rect>
          <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>

    <div class="demo-copy-row">
      <span class="demo-copy-label">Срок действия:</span>
      <span class="demo-copy-value">12/30</span>
    </div>

    <div class="demo-copy-row">
      <span class="demo-copy-label">CVV:</span>
      <span class="demo-copy-value">111</span>
    </div>
  </div>

  <div class="demo-actions">
    <div class="demo-action-stack">
      <a
        class="demo-button demo-button-filled"
        href="https://ecommerceapp.flutterflow.app/"
        target="_blank"
        rel="noreferrer"
      >
        Web-версия
      </a>
      <p class="demo-meta">Без скачивания</p>
    </div>
    <a class="demo-button demo-button-text" href="#">
      Скачать
    </a>
  </div>
`.trim();

export const projects: Project[] = [
  {
    slug: "e-commerce",
    title: "Онлайн покупки",
    category: "Электронная коммерция / Онлайн-покупки",
    descriptionMarkdown: `
Полноценное демо-приложение интернет-магазина одежды и обуви с оплатой через Ю-Кассу.

## Что внутри

- Каталог товаров
- Фасетный фильтр и сортировка
- Корзина и оформление заказа
- Интеграция с Ю-Кассой
- Регистрация и авторизация
    `.trim(),
    stack: "Backend: Supabase, Xano\nFrontend: FlutterFlow",
    demoAccessHTML: ecommerceDemoAccessHTML,
    screenshots: createScreenshots(
      "e-commerce",
      [
        "EС_Home.webp",
        "EС_Products.webp",
        "EС_Filter.webp",
        "EС_Product.webp",
        "EС_Cart.webp",
        "EС_Order.webp",
        "EС_Payment.webp",
        "EС_Orders.webp",
        "EС_Product_Dark.webp",
        "EС_Products_Dark.webp",
        "EС_Cart_Dark.webp",
      ],
      "Онлайн покупки",
    ),
  },
  {
    slug: "cognitivy",
    title: "Cognitivy",
    category: "Психология / Саморазвитие",
    descriptionMarkdown: `
Приложение для ведения когнитивного дневника в рамках современных подходов КПТ и РЭПТ. Помогает анализировать эмоции, выявлять деструктивные мысли и менять шаблоны мышления.

## Что внутри

- Удобный выбор эмоций по категориям
- Анализ мыслей с маркировкой когнитивных искажений
- Комплексное оспаривание нескольких негативных мыслей, относящихся к одной записи
- Обучающий тур и примеры
    `.trim(),
    stack: "Backend: Supabase, Xano\nFrontend: FlutterFlow",
    demoAccessHTML: placeholderDemoAccessHTML,
    screenshots: createScreenshots(
      "cognitivy",
      [
        "C 1.webp",
        "C 2.webp",
        "C 3.webp",
        "C 4.webp",
        "C 5.webp",
        "C 6.webp",
      ],
      "Cognitivy",
    ),
  },
  {
    slug: "e-dy-delivery",
    title: "Аналог Самоката: курьерам",
    category: "Электронная коммерция / Доставка",
    descriptionMarkdown: `
Приложение для курьеров, упрощающее процесс доставки товаров из darkstore до клиента. Четкий пошаговый алгоритм исключает путаницу и пропуск важных действий.

## Что внутри

- Очередь заказов
- Пошаговая система доставки
- История заказов
- Авторизация и личный кабинет
- Удобный интерфейс
    `.trim(),
    stack: "Backend: Supabase, PHP (Laravel)\nFrontend: FlutterFlow",
    demoAccessHTML: placeholderDemoAccessHTML,
    screenshots: createScreenshots(
      "e-dy-delivery",
      [
        "D Step 1.webp",
        "D Step 2.webp",
        "D Step 3.webp",
        "D Step 4.webp",
        "D Ready.webp",
        "D Order.webp",
        "D Orders.webp",
      ],
      "Аналог Самоката: курьерам",
    ),
  },
  {
    slug: "e-dy-picking",
    title: "Аналог Самоката: сборщикам",
    category: "Электронная коммерция / Доставка",
    descriptionMarkdown: `
Внутреннее приложение для сотрудников darkstore, обеспечивающее быструю и безошибочную сборку товаров.

## Что внутри

- Очередь заказов
- Пошаговая сборка заказов
- Сканирование товаров с помощью bluetooth-сканера или ввод кодов вручную
- Встроенный контроль ошибок
- История заказов
- Авторизация
    `.trim(),
    stack: "Backend: Supabase, PHP (Laravel)\nFrontend: FlutterFlow",
    demoAccessHTML: placeholderDemoAccessHTML,
    screenshots: createScreenshots(
      "e-dy-picking",
      [
        "P Step 1.webp",
        "P Step 2.webp",
        "P Step 3.webp",
        "P Picked.webp",
        "P Order.webp",
        "P Orders.webp",
      ],
      "Аналог Самоката: сборщикам",
    ),
  },
  {
    slug: "freight-transportation",
    title: "Грузовые перевозки",
    category: "Логистика / Грузоперевозки",
    descriptionMarkdown: `
Приложение для водителей грузовиков, которое упрощает поиск и выполнение заказов на перевозки. Позволяет быстро находить подходящие грузы, просматривать маршруты и управлять выполнением задач.

## Что внутри

- Очередь заказов
- Детальная карточка заказа вместе с картой маршрута
- Принятие и завершение заказа
- Авторизация и профиль
    `.trim(),
    stack: "Backend: 1C http-сервис\nFrontend: FlutterFlow",
    demoAccessHTML: placeholderDemoAccessHTML,
    screenshots: createScreenshots(
      "freight-transportation",
      [
        "FT-Login.webp",
        "FT-Order.webp",
        "FT-Orders-Free.webp",
        "FT-Orders-My.webp",
        "FT-Profile.webp",
      ],
      "Грузовые перевозки",
    ),
  },
  {
    slug: "financal-tracker",
    title: "Финансовый трекер: учет доходов и расходов",
    category: "Финансы",
    descriptionMarkdown: `
Приложение для учета пожертвований и расходов духовной организации с детальной аналитикой.

## Что внутри

- Список платежей и детальная карточка платежа
- Удобная форма добавления платежей и редактирования
- Аналитика и отчеты
- Авторизация
    `.trim(),
    stack: "Backend: Supabase\nFrontend: FlutterFlow",
    demoAccessHTML: placeholderDemoAccessHTML,
    screenshots: createScreenshots(
      "financal-tracker",
      [
        "M Home.webp",
        "M Add Payment.webp",
        "M Payment.webp",
        "M Report 1.webp",
        "M Report 2.webp",
        "M Report 3.webp",
        "M Report 4.webp",
      ],
      "Финансовый трекер",
    ),
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
