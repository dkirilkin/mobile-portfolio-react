import type { Case, Project } from "@/types/project";

import { getVisibleCaseProjectBySlug } from "@/data/projects";

export const cases: Case[] = [
  {
    order: 1,
    isVisible: true,
    slug: "ev-charging",
    title: "Мобильная зарядка электромобилей",
    category: "Электромобили / Сервисная экосистема",
    summary:
      "Экосистема для мобильной зарядки электромобилей: клиент создает заказ, диспетчер назначает техника, техник едет по маршруту и выполняет зарядку, а OCPP-брокер управляет мобильной зарядной станцией и собирает статистику зарядной сессии.",
    challengeMarkdown: `
Задача - собрать сервис мобильной зарядки электромобилей вокруг нескольких ролей. Клиенту нужен простой заказ услуги, диспетчеру - контроль заявок и назначение техника, технику - маршрут с точками и понятный сценарий выполнения работ.

Отдельная часть системы - OCPP-брокер. Им может управлять диспетчер, а приложение техника обращается к нему через API, когда техник запускает или останавливает зарядку на мобильной зарядной станции.
    `.trim(),
    resultMarkdown: `
- Сделаны два мобильных приложения: для клиента и для техника
- Клиент оформляет заказ и отслеживает статус услуги
- Диспетчерская роль встроена в общую схему процесса и отвечает за назначение техника
- Техник работает с маршрутом, точками и статусами выполнения
- OCPP-брокер подключается на этапе зарядки, управляет станцией и ведет статистику сессии
    `.trim(),
    systemNodes: [
      {
        id: "client-app",
        title: "Приложение клиента",
        role: "Клиент",
        description: "Создание заказа, адрес, параметры услуги и отслеживание статуса.",
        projectSlug: "ev-clients",
      },
      {
        id: "dispatcher-app",
        title: "Веб-приложение диспетчера",
        role: "Диспетчер",
        description: "Контроль новых заявок, назначение техника и управление процессом.",
      },
      {
        id: "technician-app",
        title: "Приложение техника",
        role: "Техник",
        description: "Маршрут, точки, статусы выполнения и доступ к зарядке через API.",
        projectSlug: "ev-technicians",
      },
      {
        id: "ocpp-broker",
        title: "OCPP-брокер",
        role: "Технический сервис",
        description: "Управление мобильной зарядной станцией и статистика зарядной сессии.",
      },
    ],
    systemEdges: [
      {
        from: "client-app",
        to: "dispatcher-app",
        label: "Создает заказ",
      },
      {
        from: "dispatcher-app",
        to: "technician-app",
        label: "Назначает техника",
      },
      {
        from: "technician-app",
        to: "dispatcher-app",
        label: "Маршрут, точки, статусы",
      },
      {
        from: "dispatcher-app",
        to: "ocpp-broker",
        label: "Управляет",
      },
      {
        from: "technician-app",
        to: "ocpp-broker",
        label: "Запуск/остановка через API",
      },
    ],
    projectSlugs: ["ev-clients", "ev-technicians"],
  },
  {
    order: 2,
    isVisible: true,
    slug: "goods-delivery",
    title: "Доставка товаров из darkstore",
    category: "E-commerce / Доставка товаров",
    summary:
      "Система доставки товаров на Supabase: клиент выбирает товары и оформляет заказ, сборщик собирает позиции на складе, курьер получает готовый заказ и доставляет его клиенту.",
    challengeMarkdown: `
Задача - собрать единую цепочку доставки товаров из darkstore. Клиентское приложение отвечает за заказ, приложение сборщика - за точную сборку позиций на складе, приложение курьера - за доставку до клиента.

Все три приложения работают на Supabase, чтобы заказ, статусы и история были синхронизированы между ролями без ручной передачи информации.
    `.trim(),
    resultMarkdown: `
- Сделаны три приложения: клиент, сборщик и курьер
- Клиент проходит путь от каталога и корзины до истории заказов
- Сборщик видит очередь заказов и проверяет товары при сборке
- Курьер получает готовый заказ, ведет доставку по этапам и обновляет статусы
- Supabase выступает общим backend для заказов, статусов и истории
    `.trim(),
    systemNodes: [
      {
        id: "client-app",
        title: "Приложение клиента",
        role: "Клиент",
        description: "Каталог, корзина, оформление заказа, профиль и история.",
        projectSlug: "goods-delivery-clients",
      },
      {
        id: "supabase",
        title: "Supabase",
        role: "Backend",
        description: "Заказы, статусы, пользователи и история операций.",
      },
      {
        id: "picking-app",
        title: "Приложение сборщика",
        role: "Сборщик",
        description: "Очередь заказов, позиции, сканирование и контроль ошибок.",
        projectSlug: "goods-delivery-picking",
      },
      {
        id: "courier-app",
        title: "Приложение курьера",
        role: "Курьер",
        description: "Готовые заказы, этапы доставки, статусы и история.",
        projectSlug: "goods-delivery-couriers",
      },
    ],
    systemEdges: [
      {
        from: "client-app",
        to: "supabase",
        label: "Каталог, корзина, заказ",
      },
      {
        from: "supabase",
        to: "picking-app",
        label: "Заказ на сборку",
      },
      {
        from: "picking-app",
        to: "supabase",
        label: "Заказ собран",
      },
      {
        from: "supabase",
        to: "courier-app",
        label: "Готов к доставке",
      },
      {
        from: "courier-app",
        to: "supabase",
        label: "Статусы доставки",
      },
      {
        from: "supabase",
        to: "client-app",
        label: "История и детали заказа",
      },
    ],
    projectSlugs: [
      "goods-delivery-clients",
      "goods-delivery-picking",
      "goods-delivery-couriers",
    ],
  },
];

export function getCaseBySlug(slug: string) {
  return cases.find((caseItem) => caseItem.slug === slug);
}

export function getVisibleCaseBySlug(slug: string) {
  return cases.find((caseItem) => caseItem.slug === slug && caseItem.isVisible);
}

export function getSortedCases() {
  return [...cases].sort((firstCase, secondCase) => {
    return firstCase.order - secondCase.order;
  });
}

export function getVisibleSortedCases() {
  return getSortedCases().filter((caseItem) => caseItem.isVisible);
}

export function getCaseProjects(caseItem: Case): Project[] {
  return caseItem.projectSlugs
    .map((slug) => getVisibleCaseProjectBySlug(slug))
    .filter((project): project is Project => Boolean(project));
}

export function getCaseSystemNodes(caseItem: Case) {
  return caseItem.systemNodes.map((node) => {
    if (!node.projectSlug || getVisibleCaseProjectBySlug(node.projectSlug)) {
      return node;
    }

    return {
      ...node,
      projectSlug: undefined,
    };
  });
}
