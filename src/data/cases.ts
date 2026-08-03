import type { Case, Project } from "@/types/project";
import { getProjectBySlug } from "@/data/projects";

export const cases: Case[] = [
  {
    order: 1,
    slug: "darkstore-delivery",
    title: "Доставка из даркстора: полный цикл",
    category: "Электронная коммерция / Доставка",
    summary:
      "Сквозная система доставки по модели Самоката: клиент оформляет заказ, сборщик собирает его на дарксторе, курьер доставляет. Три приложения работают на одном backend.",
    challengeMarkdown: `
Задача — построить полный цикл быстрой доставки товаров из даркстора: от оформления заказа клиентом до выдачи курьером. Каждая роль (покупатель, сборщик, курьер) получает собственное приложение, а все процессы синхронизируются через общий backend в реальном времени.

Ключевая сложность — состыковать роли в единую цепочку без потерь и путаницы: статусы заказа, очереди, контроль ошибок на каждом шаге.
    `.trim(),
    resultMarkdown: `
- Приложения сборщика и курьера готовы и работают на общем backend (Supabase + Laravel)
- Пошаговые сценарии исключают пропуск действий и ошибки персонала
- Клиентское приложение в разработке — цепочка замкнётся от заказа до доставки
- Backend готов к веб-админке для операторов даркстора
    `.trim(),
    stages: [
      {
        title: "Заказ",
        description: "Клиентское приложение: каталог, корзина, оплата, отслеживание статуса",
        status: "in-progress",
      },
      {
        title: "Сборка",
        description: "Приложение сборщика: очередь заказов, пошаговая сборка, bluetooth-сканер",
        status: "done",
        projectSlug: "e-dy-picking",
      },
      {
        title: "Доставка",
        description: "Приложение курьера: очередь, пошаговая доставка, история заказов",
        status: "done",
        projectSlug: "e-dy-delivery",
      },
      {
        title: "Управление",
        description: "Веб-админка для операторов даркстора",
        status: "planned",
      },
    ],
    projectSlugs: ["e-dy-picking", "e-dy-delivery"],
  },
  {
    order: 2,
    slug: "ev-charging",
    title: "Мобильная зарядка электромобилей",
    category: "Электромобили / Сервис",
    summary:
      "Экосистема из четырёх компонентов: приложения клиента и техника, десктоп для оператора и OCPP-брокер для контроля зарядных станций. Приложения опубликованы в App Store и Google Play.",
    challengeMarkdown: `
Задача — построить сервис мобильной зарядки электромобилей «по кнопке»: клиент заказывает зарядку через приложение, техник выезжает и заряжает автомобиль. Сервис объединяет два мобильных приложения, десктопное приложение оператора и OCPP-брокер для контроля зарядных станций.

Backend построен на Supabase с активным использованием ключевых возможностей платформы: PostgreSQL, Edge Functions, RPC-функции, cron-задачи и realtime-обновления.
    `.trim(),
    resultMarkdown: `
- Оба мобильных приложения опубликованы в App Store и Google Play
- Полный цикл заказа: от оформления до фотофиксации результата
- Реалтайм-статусы заказа и движения техника
- Интеграции: геолокация и карты, навигация, OCPP-контроль станций
    `.trim(),
    stages: [
      {
        title: "Клиент",
        description: "Заказ мобильной зарядки: форма, карта, статусы в реальном времени",
        status: "done",
        projectSlug: "ev-clients",
      },
      {
        title: "Техник",
        description: "Маршруты, приём заказов, передача статусов выполнения",
        status: "done",
        projectSlug: "ev-technicians",
      },
      {
        title: "Оператор",
        description: "Десктопное приложение диспетчера сервиса",
        status: "done",
      },
      {
        title: "OCPP-брокер",
        description: "Контроль зарядных станций по протоколу OCPP",
        status: "done",
      },
    ],
    projectSlugs: ["ev-clients", "ev-technicians"],
  },
];

export function getCaseBySlug(slug: string) {
  return cases.find((caseItem) => caseItem.slug === slug);
}

export function getSortedCases() {
  return [...cases].sort(
    (firstCase, secondCase) => firstCase.order - secondCase.order,
  );
}

export function getCaseProjects(caseItem: Case): Project[] {
  return caseItem.projectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => Boolean(project));
}
