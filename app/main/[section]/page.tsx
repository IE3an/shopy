import Link from "next/link";
import { ArrowLeft, Headphones, Laptop, Package, Smartphone, Watch } from "lucide-react";
import { notFound } from "next/navigation";

type SectionPageProps = {
  params: Promise<{ section: string }>;
};

const sections = {
  store: {
    title: "فروشگاه",
    eyebrow: "PANDA STORE",
    description: "تمام محصولات منتخب پاندا شاپی در یک نگاه.",
    icon: Package,
    items: ["iPhone 16 Pro", "MacBook Air M3", "iPad Pro", "Apple Watch Ultra 2", "AirPods Pro"],
  },
  mac: {
    title: "Mac",
    eyebrow: "POWERFUL & LIGHT",
    description: "برای کار، خلق و هر ایده‌ای که نمی‌گذارد منتظر بماند.",
    icon: Laptop,
    items: ["MacBook Air M3", "MacBook Air", "MacBook Pro", "iMac"],
  },
  ipad: {
    title: "iPad",
    eyebrow: "CREATE ANYWHERE",
    description: "تبلتی انعطاف‌پذیر برای مطالعه، طراحی و کار روزمره.",
    icon: Package,
    items: ["iPad Pro", "iPad Air", "iPad", "iPad mini"],
  },
  iphone: {
    title: "iPhone",
    eyebrow: "YOUR EVERYDAY",
    description: "جدیدترین آیفون‌ها برای ارتباط، کار و لحظه‌های مهم.",
    icon: Smartphone,
    items: ["iPhone 17", "iPhone 16 Pro", "iPhone 16", "iPhone SE"],
  },
  watch: {
    title: "Apple Watch",
    eyebrow: "MOVE SMARTER",
    description: "سلامتی، ورزشی و اعلان‌ها همیشه روی مچ شما.",
    icon: Watch,
    items: ["Apple Watch Ultra 2", "Apple Watch Series 10", "Apple Watch SE"],
  },
  airpods: {
    title: "AirPods",
    eyebrow: "HEAR THE DIFFERENCE",
    description: "صدای شفاف و تجربه‌ای راحت برای هر لحظه.",
    icon: Headphones,
    items: ["AirPods Pro", "AirPods 4", "AirPods Max"],
  },
  support: {
    title: "پشتیبانی",
    eyebrow: "WE ARE HERE",
    description: "برای انتخاب محصول، پیگیری سفارش و خدمات پس از خرید کنار شما هستیم.",
    icon: Headphones,
    items: ["راهنمای انتخاب محصول", "پیگیری سفارش", "گارانتی و خدمات", "تماس با پشتیبانی"],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  const sectionKey = section as keyof typeof sections;
  const content = sections[sectionKey];

  if (!content) notFound();

  const Icon = content.icon;

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f1e8] text-[#171717]">
      <header className="border-b border-white/10 bg-[#111827] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/main" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5c84c] text-lg font-black text-[#111827]">P</span>
            <span className="text-lg font-black">Panda Shopy</span>
          </Link>
          <Link href="/main" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/75 transition hover:border-[#f5c84c] hover:text-[#f5c84c]">
            بازگشت به فروشگاه <ArrowLeft size={16} />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <section className="overflow-hidden rounded-[2rem] bg-[#f5c84c] px-6 py-10 sm:px-10 sm:py-14">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-xs font-black tracking-[.2em] text-black/45">{content.eyebrow}</p>
              <h1 className="text-4xl font-black sm:text-6xl">{content.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-black/65 sm:text-lg">{content.description}</p>
            </div>
            <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-[2rem] border-[7px] border-[#171717] bg-[#1728d8] text-white shadow-[12px_14px_0_rgba(23,23,23,.12)]">
              <Icon size={58} strokeWidth={1.7} />
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5">
            <p className="text-xs font-black tracking-[.18em] text-[#1728d8]">PANDA COLLECTION</p>
            <h2 className="mt-2 text-2xl font-black">انتخاب‌های پیشنهادی</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.items.map((item, index) => (
              <article key={item} className="rounded-[1.5rem] border border-black/[0.06] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,23,23,.08)]">
                <div className="flex h-36 items-center justify-center rounded-[1.1rem] bg-[#e8ecfa]">
                  <Icon size={42} className="text-[#1728d8]" />
                </div>
                <p className="mt-4 text-xs font-black text-[#1728d8]">0{index + 1}</p>
                <h3 className="mt-1 font-black">{item}</h3>
                <Link href="/main#products" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-black/55 hover:text-[#1728d8]">
                  مشاهده در فروشگاه <ArrowLeft size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
