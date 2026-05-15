import { TELEGRAM_URL } from "@/constants/contact";
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

const requestDemoAccessHTML = `
  <div class="demo-section">
    <h3 class="demo-heading">Демо-доступ</h3>
    <p class="demo-meta">
      Получите доступ к демонстрационной версии.
    </p>
    <div class="demo-actions">
      <a
        class="demo-button demo-button-filled"
        href="${TELEGRAM_URL}"
        target="_blank"
        rel="noreferrer"
      >
        <span class="demo-button-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.47 4.34a1.6 1.6 0 0 0-1.68-.21L3.46 10.6a1.2 1.2 0 0 0 .07 2.25l3.75 1.24 1.47 4.56a1.2 1.2 0 0 0 2.03.48l2.09-2.14 3.97 3.03a1.6 1.6 0 0 0 2.55-.92l2.47-13.15a1.6 1.6 0 0 0-.39-1.61ZM9.3 13.66l8.2-6.27-6.54 7.28a.75.75 0 0 0-.18.33l-.65 2.78-.83-2.58a.75.75 0 0 0-.48-.49l-2.15-.71 10.83-4.16-8.35 5.39a.75.75 0 0 0 .2 1.43Z" />
          </svg>
        </span>
        Запросить доступ
      </a>
    </div>
  </div>
`.trim();

void placeholderDemoAccessHTML;

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
    order: 1,
    isOnHome: true,
    slug: "e-commerce",
    title: "Онлайн покупки",
    category: "Электронная коммерция / Онлайн-покупки",
    homeTitle: "Онлайн покупки",
    homeIconPath: "/images/svg_icons/shopping_bag.svg",
    homeIconBg: "#774F83",
    homeDescription: "MVP интернет-магазина с корзиной, оплатой и личным кабинетом.",
    homeCategory: "E-commerce",
    homeTags: ["FlutterFlow", "Supabase", "Xano"],
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
    order: 4,
    isOnHome: true,
    slug: "cognitivy",
    title: "Cognitivy (психология)",
    category: "Психология / Саморазвитие",
    homeTitle: "Cognitivy (психология)",
    homeIconPath: "/images/svg_icons/thought.svg",
    homeIconBg: "#0055D5",
    homeDescription: "Когнитивный дневник для анализа эмоций и мыслей.",
    homeCategory: "Mental Health",
    homeTags: ["FlutterFlow", "Supabase", "Xano"],
    descriptionMarkdown: `
Приложение для ведения когнитивного дневника в рамках современных подходов КПТ и РЭПТ. Помогает анализировать эмоции, выявлять деструктивные мысли и менять шаблоны мышления.

## Что внутри

- Удобный выбор эмоций по категориям
- Анализ мыслей с маркировкой когнитивных искажений
- Комплексное оспаривание нескольких негативных мыслей, относящихся к одной записи
- Обучающий тур и примеры
    `.trim(),
    stack: "Backend: Supabase, Xano\nFrontend: FlutterFlow",
    demoAccessHTML: requestDemoAccessHTML,
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
    order: 5,
    isOnHome: true,
    slug: "e-dy-delivery",
    title: "Доставка товаров: для курьеров",
    category: "Электронная коммерция / Доставка",
    homeTitle: "Аналог Самоката: курьерам",
    homeIconPath: "/images/svg_icons/pedal_bike.svg",
    homeIconBg: "#EA570F",
    homeDescription: "Пошаговое приложение для курьеров darkstore.",
    homeCategory: "Delivery",
    homeTags: ["FlutterFlow", "Supabase", "Laravel"],
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
    demoAccessHTML: requestDemoAccessHTML,
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
    order: 6,
    isOnHome: true,
    slug: "e-dy-picking",
    title: "Аналог Самоката: сборщикам",
    category: "Электронная коммерция / Доставка",
    homeTitle: "Аналог Самоката: сборщикам",
    homeIconPath: "/images/svg_icons/box.svg",
    homeIconBg: "#EA570F",
    homeDescription: "Внутренний инструмент для сборщиков склада.",
    homeCategory: "Operations",
    homeTags: ["FlutterFlow", "Supabase", "Laravel"],
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
    demoAccessHTML: requestDemoAccessHTML,
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
    order: 8,
    isOnHome: false,
    slug: "freight-transportation",
    title: "Грузовые перевозки",
    category: "Логистика / Грузоперевозки",
    homeTitle: "Грузоперевозки",
    homeIconPath: "/images/svg_icons/delivery_truck_speed.svg",
    homeIconBg: "#3B608F",
    homeDescription: "Поиск и выполнение заказов для водителей грузовиков.",
    homeCategory: "Logistics",
    homeTags: ["FlutterFlow", "1C", "B2B"],
    descriptionMarkdown: `
Приложение для водителей грузовиков, которое упрощает поиск и выполнение заказов на перевозки. Позволяет быстро находить подходящие грузы, просматривать маршруты и управлять выполнением задач.

## Что внутри

- Очередь заказов
- Детальная карточка заказа вместе с картой маршрута
- Принятие и завершение заказа
- Авторизация и профиль
    `.trim(),
    stack: "Backend: 1C http-сервис\nFrontend: FlutterFlow",
    demoAccessHTML: requestDemoAccessHTML,
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
    order: 7,
    isOnHome: false,
    slug: "financal-tracker",
    title: "Финансовый трекер: учет доходов и расходов",
    category: "Финансы",
    homeTitle: "Финансовый трекер",
    homeIconPath: "/images/svg_icons/payments.svg",
    homeIconBg: "#33618D",
    homeDescription: "Учет доходов и расходов, аналитика для духовной организации.",
    homeCategory: "Finance",
    homeTags: ["FlutterFlow", "Supabase", "Analytics"],
    descriptionMarkdown: `
Приложение для учета пожертвований и расходов духовной организации с детальной аналитикой.

## Что внутри

- Список платежей и детальная карточка платежа
- Удобная форма добавления платежей и редактирования
- Аналитика и отчеты
- Авторизация
    `.trim(),
    stack: "Backend: Supabase\nFrontend: FlutterFlow",
    demoAccessHTML: requestDemoAccessHTML,
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
  {
    order: 2,
    isOnHome: false,
    slug: "ev-clients",
    title: "Зарядка электрокаров: для клиентов",
    category: "Электромобили / Мобильная зарядка",
    homeTitle: "Зарядка электромобилей: клиентам",
    homeIconPath: "/images/svg_icons/electric_bolt.svg",
    homeIconBg: "#3E7C75",
    homeDescription: "Клиентское приложение для заказа мобильной зарядки авто.",
    homeCategory: "EV Charging",
    homeTags: ["FlutterFlow", "Supabase", "Maps"],
    descriptionMarkdown: `
Клиентское мобильное приложение, являющееся частью экосистемы управления зарядкой электромобилей, включающей два мобильных приложения, десктопное приложение и OCPP-брокер для контроля зарядных станций. Приложение реализует полный цикл заказа мобильной зарядки с интеграцией геолокации, мониторинга и backend-сервисов. Backend построен на Supabase (PostgreSQL, Edge Functions, RPC-функции, Cron), с активным использованием всех ключевых возможностей платформы.

## Основные функции

- Авторизация по номеру телефона через SMS (OTP)
- Многошаговая форма оформления заказа (время, локация, параметры зарядки)
- Отслеживание статуса заказа и движения техника в реальном времени
- Интеграция с картами и геолокацией
- Фотофиксация состояния автомобиля до и после выполнения услуги
- Уведомления о смене статусов заказа
- Взаимодействие с backend API и системой управления зарядкой

## Backend

- PostgreSQL как основная БД
- Edge Functions для серверной логики и обработки событий
- RPC-функции для сложных операций и оптимизации запросов
- Cron-задачи для фоновых процессов и автоматизации
- Реалтайм-обновления статусов заказов
    `.trim(),
    stack: "Backend: Supabase (PostgreSQL, Edge Functions, RPC, Cron)\nFrontend: FlutterFlow",
    demoAccessHTML: requestDemoAccessHTML,
    screenshots: createScreenshots(
      "ev-clients",
      [
        "ev-home.webp",
        "ev-map.webp",
        "ev-orders.webp",
        "ev-photos.webp",
      ],
      "Зарядка электрокаров: для клиентов",
    ),
  },
  {
    order: 3,
    isOnHome: false,
    slug: "ev-technicians",
    title: "Зарядка электрокаров: для техников",
    category: "Электромобили / Мобильная зарядка",
    homeTitle: "Зарядка электромобилей: техникам",
    homeIconPath: "/images/svg_icons/recent_patient.svg",
    homeIconBg: "#3E7C75",
    homeDescription: "Приложение для техников с маршрутами, заказами и статусами.",
    homeCategory: "Field Service",
    homeTags: ["FlutterFlow", "Supabase", "Realtime"],
    descriptionMarkdown: `
Мобильное приложение для техника, являющееся частью экосистемы управления зарядкой электромобилей, включающей клиентское приложение, десктопное решение и OCPP-брокер. Приложение обеспечивает управление заказами и выполнение маршрута с поэтапной передачей статусов в backend в реальном времени. Реализована интеграция с навигацией и системой мониторинга выполнения зарядки.

## Основные функции

- Просмотр доступных заказов и принятие в работу
- Управление маршрутом и последовательностью точек
- Передача статусов выполнения заказа (выезд с базы, прибытие, начало зарядки, процесс, завершение)
- Отслеживание текущего состояния задачи с синхронизацией с backend
- Интеграция с навигацией через Яндекс.Карты
- Работа с геолокацией
- Обновление данных в реальном времени

## Backend

- Интеграция с backend на Supabase
- Реалтайм-синхронизация статусов заказов
- Использование API для управления заказами и маршрутами
- Обработка состояний (state management) для жизненного цикла заказа
    `.trim(),
    stack: "Backend: Supabase\nFrontend: FlutterFlow",
    demoAccessHTML: requestDemoAccessHTML,
    screenshots: createScreenshots(
      "ev-technicians",
      [
        "evt-home.webp",
        "evt-route.webp",
        "evt-route2.webp",
      ],
      "Зарядка электрокаров: для техников",
    ),
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getSortedProjects() {
  return [...projects].sort((firstProject, secondProject) => {
    return firstProject.order - secondProject.order;
  });
}

export function getHomeProjects() {
  return getSortedProjects().filter((project) => project.isOnHome);
}
