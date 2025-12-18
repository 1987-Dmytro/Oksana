
import React from 'react';
import { Truck, ShieldCheck, Globe, Users, TrendingDown, AlertTriangle, CheckCircle2, Phone, Mail } from 'lucide-react';

export const COLORS = {
  primary: '#0F172A',
  accent: '#F97316',
  secondary: '#1E293B',
  white: '#FFFFFF',
};

export const SLIDES = [
  {
    id: 1,
    type: 'hero',
    title: 'Захист у Дорозі',
    subtitle: 'Комплексні страхові рішення для вантажоперевезень від B.L.S. TRANS.LOGISTIK',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 2,
    type: 'split',
    title: 'Війна Змінила Все',
    subtitle: 'Нові виклики вимагають надійнішого захисту',
    content: [
      {
        icon: <TrendingDown className="w-8 h-8 text-orange-500" />,
        title: 'ДТП на маршрутах',
        desc: 'Середній збиток від ДТП зараз коливається між €20,000 та €30,000. Це критичний удар по стабільності бізнесу.'
      },
      {
        icon: <AlertTriangle className="w-8 h-8 text-orange-500" />,
        title: 'Воєнні дії',
        desc: 'Обстріли трас та форс-мажори роблять логістику непередбачуваною. Страхування — це ваш фундамент спокою.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 3,
    type: 'grid',
    title: 'Чотири Рішення для Вашого Бізнесу',
    content: [
      { title: 'Автострахування', desc: 'Зелена картка та Автоцивілка для 48 країн Європи.', icon: <Truck /> },
      { title: 'Вантажі', desc: 'Три рівні захисту: від базового до повного воєнного покриття.', icon: <ShieldCheck /> },
      { title: 'Мандрівники', desc: 'Медичне страхування водіїв від €3 на добу.', icon: <Users /> },
      { title: 'Агрострахування', desc: 'Спеціалізований захист для агропродукції та техніки.', icon: <Globe /> }
    ]
  },
  {
    id: 4,
    type: 'tiers',
    title: 'Страхування Вантажів',
    subtitle: 'Оберіть свій рівень безпеки',
    content: [
      { name: 'Базовий', features: ['Катастрофи', 'Пожежі', 'Стихійні лиха'], color: 'bg-slate-700' },
      { name: 'Стандарт', features: ['Базовий +', 'Аварії', 'Викрадення'], color: 'bg-blue-600', popular: true },
      { name: 'Преміум', features: ['Стандарт +', 'Воєнні ризики', 'Повне покриття'], color: 'bg-orange-600' }
    ]
  },
  {
    id: 5,
    type: 'case',
    title: 'Реальний Кейс: Врятували €18,000',
    content: {
      client: 'Експортер меблів з Києва (25 фур/міс)',
      problem: 'ДТП на польському кордоні. Перекидання фури та пошкодження товару.',
      solution: 'B.L.S. покрило всі витрати протягом 7 робочих днів.'
    },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 6,
    type: 'steps',
    title: '5 Кроків до Захисту',
    content: [
      { step: '01', title: 'Запит', desc: 'Дзвінок або заявка (15 хв)' },
      { step: '02', title: 'Розрахунок', desc: 'Підбір тарифів (1 год)' },
      { step: '03', title: 'Оформлення', desc: 'Договір онлайн (30 хв)' },
      { step: '04', title: 'Оплата', desc: 'Безготівковий розрахунок' },
      { step: '05', title: 'Захист', desc: 'Супровід 24/7 у дорозі' }
    ]
  },
  {
    id: 7,
    type: 'partners',
    title: 'Наші Партнери: Надійність × 4',
    content: [
      { name: 'VUSO', desc: 'Лідер автострахування в Україні' },
      { name: 'PZU Ukraine', desc: '100 років досвіду в Європі' },
      { name: 'ARX', desc: 'Міжнародні стандарти якості' },
      { name: 'UNIQUA', desc: 'Стабільність та інновації' }
    ]
  },
  {
    id: 8,
    type: 'contact',
    title: 'Індивідуальні Умови',
    subtitle: 'Отримайте безкоштовний аудит ризиків вашого бізнесу сьогодні',
    content: {
      phone: '+38 (096) 05-54-175',
      email: 'blstranslogistik@gmail.com',
      url: 'blstranslogistik.com'
    }
  }
];
