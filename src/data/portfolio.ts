import { getProjectBySlug } from "@/data/projects";
import { getCaseBySlug } from "@/data/cases";
import type { PortfolioImage, PortfolioWork } from "@/types/portfolio";

export const portfolioAuthor = {
  name: "Дмитрий Кирилкин",
  // Working descriptor, not a settled sector-specific positioning.
  role: "Разработчик мобильных приложений",
  portrait: "/images/dk_photo.webp",
};

function screen(slug: string, file: string, caption: string): PortfolioImage {
  const source = getProjectBySlug(slug)?.screenshots.find((item) => item.src.endsWith(file));
  if (!source) throw new Error(`Missing portfolio image: ${slug}/${file}`);
  const dimensions = slug === "ev-clients" ? [810, 1440] : slug === "ev-technicians" ? [571, 1280] : [1080, 2408];
  return { ...source, alt: caption, caption, width: dimensions[0], height: dimensions[1], kind: slug === "ev-clients" ? "promo" : "screenshot" };
}

export const chargingImages = {
  location: screen("ev-clients", "ev-map.webp", "Клиент выбирает место зарядки"),
  order: screen("ev-clients", "ev-orders.webp", "Параметры и состояние заказа"),
  photos: screen("ev-clients", "ev-photos.webp", "Фотографии автомобиля до и после зарядки"),
  route: screen("ev-technicians", "evt-route2.webp", "Техник выполняет маршрут по точкам"),
  orders: screen("ev-technicians", "evt-home.webp", "Маршруты в приложении техника"),
};

export const chargingCase = {
  title: getCaseBySlug("ev-charging")!.title,
  name: getCaseBySlug("ev-charging")!.title,
  summary: "Клиенту нужно заказать зарядку автомобиля. Технику — получить маршрут и выполнить работу. Для каждого разработано своё приложение внутри общей системы.",
  contribution: "Я разработал приложения для клиентов и техников на Flutter + Supabase.",
  context: "В сервис также входят диспетчерская и OCPP-брокер управления зарядными станциями. Они показаны здесь как связанные компоненты системы.",
  perspectives: [
    { id: "client", label: "Глазами клиента", title: "Знать, что происходит с заказом", description: "Выбрать место и параметры зарядки, следить за состоянием заказа и увидеть фотографии автомобиля после выполнения услуги.", image: chargingImages.location },
    { id: "technician", label: "Глазами техника", title: "Видеть маршрут и следующий шаг", description: "Открыть назначенный маршрут, перейти к нужной точке и передать статус выполнения. Действия собраны в приложении техника.", image: chargingImages.route },
  ],
  process: [
    { title: "Клиент", action: "Создаёт заказ", detail: "Локация и параметры услуги", own: true },
    { title: "Диспетчер", action: "Назначает техника", detail: "Контекст общей системы", own: false },
    { title: "Техник", action: "Выполняет маршрут", detail: "Точки, действия и статусы", own: true },
    { title: "OCPP-брокер", action: "Управляет зарядкой", detail: "Контекст общей системы", own: false },
  ],
  links: [
    { label: "Клиент · App Store", href: "https://apps.apple.com/ru/app/%D0%BA%D0%BB%D1%83%D0%B1-%D0%B7%D0%B0%D1%80%D1%8F%D0%B4-%D1%81%D0%B2%D0%BE%D0%B1%D0%BE%D0%B4%D1%8B/id6752478185" },
    { label: "Клиент · Google Play", href: "https://play.google.com/store/apps/details?id=com.electrocharge.electrocharge" },
    { label: "Техник · Google Play", href: "https://play.google.com/store/apps/details?id=com.electrocharge.technicians" },
  ],
};

export const portfolioWorks: PortfolioWork[] = [
  {
    id: "charging", title: chargingCase.title, shortTitle: "Заказать зарядку", context: chargingCase.name, status: "Опубликовано",
    description: "Два взгляда на одну услугу: клиент заказывает зарядку, техник получает маршрут. Приложения связывают их действия внутри большого сервиса.",
    images: [chargingImages.location, chargingImages.route], href: "/cases/ev-charging",
    features: ["Приложение клиента", "Приложение техника", "Flutter + Supabase"],
  },
  {
    id: "shopping", title: "От выбора к покупке", shortTitle: "Выбрать и купить", context: "Интернет-магазин", status: "Демопроект", href: "/projects/e-commerce",
    description: "Каталог одежды и обуви, фильтры, корзина и оформление заказа. Платёжный сценарий показан в тестовом режиме ЮKassa.",
    images: [screen("e-commerce", "EС_Product.webp", "Карточка товара в демо интернет-магазина"), screen("e-commerce", "EС_Filter.webp", "Фильтрация по типу, цвету и цене"), screen("e-commerce", "EС_Cart.webp", "Корзина перед оформлением заказа")],
    features: ["Каталог и фильтры", "Корзина", "Тестовая оплата"],
  },
  {
    id: "finance", title: "Увидеть картину целиком", shortTitle: "Разобраться в расходах", context: "Учёт пожертвований и расходов", href: "/projects/financal-tracker",
    description: "Приложение для духовной организации: платежи, категории, счета и отчёты. Повседневные записи складываются в общую картину финансов.",
    images: [screen("financal-tracker", "M Report 4.webp", "Отчёт о расходах по категориям"), screen("financal-tracker", "M Add Payment.webp", "Добавление платежа с категорией и счётом")],
    features: ["Платежи", "Категории и счета", "Отчёты"],
  },
  {
    id: "delivery", title: getCaseBySlug("goods-delivery")!.title, shortTitle: "Собрать заказ", context: "Приложения для клиента, сборщика и курьера", href: "/cases/goods-delivery",
    description: "Очереди заказов и последовательные действия для сотрудников даркстора. Отдельные интерфейсы для сборки товаров и доставки клиенту.",
    images: [screen("goods-delivery-picking", "P Order.webp", "Состав заказа в приложении сборщика"), screen("goods-delivery-couriers", "D Step 3.webp", "Переход к доставке заказа")],
    features: ["Очередь заказов", "Сборка по позициям", "Доставка по шагам"],
  },
  {
    id: "freight", title: "Груз, маршрут и заказ", shortTitle: "Взять груз в работу", context: "Грузоперевозки", href: "/projects/freight-transportation",
    description: "Приложение для водителей: найти подходящий груз, посмотреть маршрут и принять заказ в работу.",
    images: [screen("freight-transportation", "FT-Order.webp", "Маршрут и условия грузоперевозки")],
    features: ["Поиск груза", "Маршрут", "Принятие заказа"],
  },
];

export const openingWorks = portfolioWorks.slice(0, 3);
