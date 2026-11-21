"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowUpLeft, Check, Heart, Menu, Search,
  ShoppingBag, ShoppingCart, User, X, Plus, Minus, Headphones,
  Smartphone, Laptop, Watch, Headphones as AudioIcon, Package, Zap
} from "lucide-react";

type Product = {
  title: string;
  subtitle: string;
  priceLabel: string;
  priceValue: number;
  badge: string;
  available?: boolean;
  category: string;
  visual: string;
  accent: string;
};

type ChatMessage = { sender: "user" | "support"; text: string };

function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "support", text: "سلام! به پاندا شاپی خوش اومدی. چطور می‌تونیم کمکت کنیم؟" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;
    setMessages((items) => [...items, { sender: "user", text: input.trim() }]);
    setInput("");
    window.setTimeout(() => {
      setMessages((items) => [...items, { sender: "support", text: "پیامت دریافت شد؛ همکاران ما به‌زودی راهنماییت می‌کنن." }]);
    }, 800);
  };

  return (
    <>
      <button onClick={() => setOpen((value) => !value)} aria-label="پشتیبانی آنلاین"
        className="fixed bottom-6 left-6 z-[100] flex items-center gap-2 rounded-full bg-[#1728d8] px-5 py-3.5 text-sm font-bold text-white shadow-[0_12px_35px_rgba(23,40,216,.3)] transition hover:-translate-y-1 hover:bg-[#0d1bb7]">
        <Headphones size={18} /><span>کمک لازم داری؟</span>
      </button>
      {open && <div className="fixed bottom-24 left-6 z-[100] flex w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-[26px] border border-black/10 bg-[#fffdf7] text-[#171717] shadow-2xl">
        <div className="flex items-center justify-between bg-[#1728d8] px-5 py-4 text-white">
          <div><p className="font-black">پشتیبانی پاندا</p><p className="mt-1 text-xs text-white/70">آنلاین و آماده پاسخگویی</p></div>
          <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/15"><X size={18} /></button>
        </div>
        <div className="flex h-64 flex-col gap-3 overflow-y-auto bg-[#f5f2e9] p-4">
          {messages.map((message, index) => <div key={index} className={message.sender === "user" ? "text-left" : "text-right"}>
            <span className={`inline-block max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.sender === "user" ? "rounded-bl-sm bg-[#1728d8] text-white" : "rounded-br-sm bg-white text-[#272727] shadow-sm"}`}>{message.text}</span>
          </div>)}
          <div ref={endRef} />
        </div>
        <form onSubmit={sendMessage} className="flex gap-2 border-t border-black/10 bg-white p-3">
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="پیامت رو بنویس..." className="min-w-0 flex-1 rounded-full bg-[#f2f1ec] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1728d8]/20" />
          <button className="rounded-full bg-[#1728d8] px-4 text-sm font-bold text-white">ارسال</button>
        </form>
      </div>}
    </>
  );
}

export default function MainPage() {
  const navItems = [
    { label: "Store", slug: "store" },
    { label: "Mac", slug: "mac" },
    { label: "iPad", slug: "ipad" },
    { label: "iPhone", slug: "iphone" },
    { label: "Watch", slug: "watch" },
    { label: "AirPods", slug: "airpods" },
    { label: "Support", slug: "support" },
  ];
  const products: Product[] = [
    { title: "iPhone 16 Pro", subtitle: "قدرتی که توی جیب جا می‌شه.", priceLabel: "از ۷۹,۹۹۹,۰۰۰ تومان", priceValue: 79999000, badge: "انتخاب سردبیر", category: "موبایل", visual: "PHONE", accent: "bg-[#dbe4ff]", },
    { title: "MacBook Air M3", subtitle: "سبک‌وزن، اما جدی و قدرتمند.", priceLabel: "از ۵۹,۹۹۹,۰۰۰ تومان", priceValue: 59999000, badge: "پرفروش", category: "لپ‌تاپ", visual: "MAC", accent: "bg-[#f8dfca]", },
    { title: "AirPods Pro", subtitle: "دنیای خودت رو واضح‌تر بشنو.", priceLabel: "از ۱۱,۹۹۹,۰۰۰ تومان", priceValue: 11999000, badge: "محبوب", category: "صوتی", visual: "SOUND", accent: "bg-[#d8f0df]", },
    { title: "iPhone 17", subtitle: "نسل تازه‌ای از تجربه روزمره.", priceLabel: "از ۸۹,۹۹۹,۰۰۰ تومان", priceValue: 89999000, badge: "تازه رسیده", category: "موبایل", visual: "17", accent: "bg-[#f3d8e8]", },
    { title: "Apple Watch Ultra 2", subtitle: "برای روزهایی که معمولی نیستند.", priceLabel: "ناموجود", priceValue: 29999000, badge: "ناموجود", category: "ساعت", visual: "WATCH", accent: "bg-[#e6e1d4]", available: false, },
    { title: "iPad Pro", subtitle: "ایده‌هات رو از صفحه بیرون بیار.", priceLabel: "ناموجود", priceValue: 49999000, badge: "ناموجود", category: "تبلت", visual: "iPAD", accent: "bg-[#e2defa]", available: false, },
  ];
  const categories = [
    { label: "همه محصولات", icon: Package },
    { label: "موبایل", icon: Smartphone },
    { label: "لپ‌تاپ", icon: Laptop },
    { label: "تبلت", icon: Package },
    { label: "ساعت", icon: Watch },
    { label: "صوتی", icon: AudioIcon },
  ];
  const [activeCategory, setActiveCategory] = useState("همه محصولات");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<Array<{ title: string; price: number; quantity: number }>>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const visibleProducts = products.filter((product) =>
    (activeCategory === "همه محصولات" || product.category === activeCategory) &&
    (!searchQuery.trim() || product.title.toLowerCase().includes(searchQuery.trim().toLowerCase()))
  );
  const formatPrice = (value: number) => `${value.toLocaleString("fa-IR")} تومان`;

  const addToCart = (product: Product) => {
    if (product.available === false) return;
    setCartItems((current) => {
      const found = current.find((item) => item.title === product.title);
      return found
        ? current.map((item) => item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { title: product.title, price: product.priceValue, quantity: 1 }];
    });
    setToast(`${product.title} به سبد اضافه شد`);
    window.setTimeout(() => setToast(""), 2400);
  };
  const updateQuantity = (title: string, delta: number) => setCartItems((items) =>
    items.map((item) => item.title === title ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0)
  );
  const toggleFavorite = (title: string) => setFavorites((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title]);

  const profileOrders = [
    { id: "#1024", product: "iPhone 16 Pro", status: "تحویل شده", date: "۱۴۰۳/۰۵/۲۱" },
    { id: "#1028", product: "MacBook Air M3", status: "در حال پردازش", date: "۱۴۰۳/۰۵/۲۸" },
  ];

  return (
    <div dir="rtl" className="min-h-screen w-full overflow-x-clip bg-[#f4f1e8] text-[#171717] transition-all duration-300">
      {/* Top navigation retained */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111827] text-white shadow-lg shadow-black/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen((value) => !value)} className="rounded-xl p-2 text-white/80 transition hover:bg-white/10 lg:hidden" aria-label="نمایش منو"><Menu size={20} /></button>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5c84c] text-lg font-black text-[#111827]">P</div>
              <div><p className="text-lg font-black tracking-tight">Panda Shopy</p><p className="text-[10px] tracking-wide text-white/50">A smarter way to shop</p></div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-white/65 lg:flex">
            {navItems.map((item) => <Link key={item.slug} href={`/main/${item.slug}`} className="transition hover:text-[#f5c84c]">{item.label}</Link>)}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => setSearchOpen((value) => !value)} aria-label="جستجو" className="rounded-xl p-2.5 text-white/80 transition hover:bg-white/10 hover:text-[#f5c84c]"><Search size={19} /></button>
            <button onClick={() => setProfileOpen(true)} aria-label="پروفایل" className="rounded-xl p-2.5 text-white/80 transition hover:bg-white/10 hover:text-[#f5c84c]"><User size={19} /></button>
            <button onClick={() => setCartOpen(true)} aria-label="سبد خرید" className="relative rounded-xl p-2.5 text-white/80 transition hover:bg-white/10 hover:text-[#f5c84c]">
              <ShoppingCart size={19} />{cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f5c84c] px-1 text-[10px] font-black text-[#111827]">{cartCount}</span>}
            </button>
          </div>
        </div>
        {mobileMenuOpen && <div className="border-t border-white/10 bg-[#111827] px-5 py-4 lg:hidden"><div className="flex flex-wrap gap-4 text-sm text-white/75">{navItems.map((item) => <Link key={item.slug} href={`/main/${item.slug}`} onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>)}</div></div>}
        {searchOpen && <div className="border-t border-white/10 bg-[#111827] px-4 py-3"><div className="mx-auto flex max-w-7xl items-center gap-3"><Search size={18} className="text-white/50" /><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="اسم محصول رو جستجو کن..." className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/35" /><button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-white/50 hover:text-white"><X size={18} /></button></div></div>}
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-7 sm:px-6 lg:px-8 lg:pt-10">
        {/* Editorial hero */}
        <section className="relative overflow-hidden rounded-[2rem] bg-[#f5c84c] px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full border-[42px] border-[#171717]/[0.06]" />
          <div className="absolute -bottom-28 right-[38%] h-72 w-72 rounded-full bg-[#1728d8]/[0.08] blur-2xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/45 px-4 py-2 text-xs font-black tracking-wide"><Zap size={14} /> انتخاب‌های هوشمند، خرید بی‌دردسر</div>
              <p className="mb-3 text-sm font-black uppercase tracking-[.22em] text-black/50">PANDA SELECT / 2026</p>
              <h1 className="text-4xl font-black leading-[1.18] tracking-tight sm:text-6xl lg:text-7xl">تکنولوژی،<br /><span className="text-[#1728d8]">با انتخاب تو.</span></h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-black/65 sm:text-lg">وسایلی که هر روز ازشون استفاده می‌کنی، باید دقیقاً همون‌قدر خاص باشن که تو هستی.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#products" className="inline-flex items-center gap-3 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#1728d8]">کشف محصولات <ArrowLeft size={17} /></a>
                <span className="text-xs font-bold text-black/50">ارسال سریع · انتخاب مطمئن · پشتیبانی واقعی</span>
              </div>
            </div>
            <div className="relative mx-auto flex h-[270px] w-full max-w-[470px] items-center justify-center sm:h-[350px]">
              <div className="absolute h-56 w-56 rotate-[-12deg] rounded-[3rem] bg-[#1728d8] shadow-[18px_24px_0_rgba(23,23,23,.12)] sm:h-72 sm:w-72" />
              <div className="absolute left-[13%] top-[9%] h-44 w-32 rotate-[-19deg] rounded-[2rem] border-[7px] border-[#171717] bg-[#d8e1ff] shadow-xl sm:h-56 sm:w-40">
                <div className="absolute left-3 top-3 h-10 w-10 rounded-full border-[5px] border-[#171717] bg-[#9eafea]" />
                <div className="absolute left-3 top-16 h-10 w-10 rounded-full border-[5px] border-[#171717] bg-[#9eafea]" />
              </div>
              <div className="absolute bottom-[8%] right-[10%] flex h-32 w-44 rotate-[10deg] items-center justify-center rounded-[1.7rem] border-[6px] border-[#171717] bg-[#f7f7f3] shadow-2xl sm:h-40 sm:w-56">
                <div className="h-24 w-24 rounded-full border-[8px] border-[#171717] bg-[#f5c84c] sm:h-28 sm:w-28" />
              </div>
              <div className="absolute right-[4%] top-[4%] rounded-full bg-[#171717] px-4 py-2 text-xs font-black text-white">NEW DROP ↗</div>
              <div className="absolute bottom-[2%] left-[5%] -rotate-6 rounded-xl bg-white px-4 py-3 text-sm font-black shadow-lg">PICK YOUR TECH.</div>
            </div>
          </div>
        </section>

        {/* Service strip */}
        <section className="my-7 grid gap-3 sm:grid-cols-3">
          {[
            { number: "01", title: "انتخاب حساب‌شده", detail: "محصولات منتخب، بدون سردرگمی" },
            { number: "02", title: "خرید آسوده", detail: "مسیر ساده از انتخاب تا سفارش" },
            { number: "03", title: "کنار تو هستیم", detail: "پشتیبانی برای قبل و بعد خرید" },
          ].map((item) => <div key={item.number} className="flex items-center gap-4 border-b-2 border-[#171717]/10 bg-white/55 px-5 py-5 sm:border-b-0 sm:border-r-2 sm:border-[#1728d8]">
            <span className="text-3xl font-black text-[#1728d8]/35">{item.number}</span><div><h3 className="font-black">{item.title}</h3><p className="mt-1 text-xs text-black/50">{item.detail}</p></div>
          </div>)}
        </section>

        {/* Products */}
        <section id="products" className="scroll-mt-28 pt-8">
          <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="mb-2 text-xs font-black tracking-[.2em] text-[#1728d8]">THE COLLECTION / 01</p><h2 className="text-3xl font-black tracking-tight sm:text-4xl">چیزهای دوست‌داشتنی.</h2><p className="mt-2 text-sm text-black/50">محصول بعدی موردعلاقه‌ات رو پیدا کن.</p></div>
            <div className="flex flex-wrap gap-2">
              {categories.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActiveCategory(label)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition ${activeCategory === label ? "border-[#1728d8] bg-[#1728d8] text-white" : "border-black/10 bg-white text-black/65 hover:border-[#1728d8] hover:text-[#1728d8]"}`}><Icon size={14} />{label}</button>)}
            </div>
          </div>
          {visibleProducts.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product, index) => <article key={product.title} className="group relative overflow-hidden rounded-[1.7rem] border border-black/[0.06] bg-white p-4 transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(23,23,23,.1)]">
              <div className={`relative flex h-56 items-center justify-center overflow-hidden rounded-[1.25rem] ${product.accent}`}>
                <span className="absolute right-4 top-4 rounded-full bg-white/75 px-3 py-1.5 text-[10px] font-black text-black/65">{product.badge}</span>
                <button onClick={() => toggleFavorite(product.title)} aria-label="علاقه‌مندی" className={`absolute left-4 top-4 rounded-full p-2.5 transition ${favorites.includes(product.title) ? "bg-[#ffdfdf] text-[#e34b56]" : "bg-white/70 text-black/55 hover:text-[#e34b56]"}`}><Heart size={17} fill={favorites.includes(product.title) ? "currentColor" : "none"} /></button>
                <div className={`relative flex items-center justify-center transition duration-500 group-hover:scale-110 ${index % 3 === 0 ? "h-36 w-28 rotate-[-8deg] rounded-[2rem] border-[7px] border-[#202020] bg-[#aebef1] shadow-xl" : index % 3 === 1 ? "h-28 w-44 rotate-[5deg] rounded-[1.4rem] border-[7px] border-[#202020] bg-[#d6d9df] shadow-xl" : "h-32 w-32 rounded-full border-[9px] border-[#202020] bg-[#f8f8f5] shadow-xl"}`}>
                  <span className="text-[11px] font-black tracking-widest text-black/55">{product.visual}</span>
                </div>
                <span className="absolute bottom-3 left-4 text-[10px] font-black tracking-[.2em] text-black/30">PS / 0{index + 1}</span>
              </div>
              <div className="px-2 pb-2 pt-5">
                <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-black tracking-[.16em] text-[#1728d8]">{product.category}</p><h3 className="mt-1 text-xl font-black">{product.title}</h3></div><span className="rounded-lg bg-[#f4f1e8] px-2 py-1 text-[10px] font-black text-black/45">0{index + 1}</span></div>
                <p className="mt-2 min-h-6 text-xs text-black/50">{product.subtitle}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/[0.07] pt-4">
                  <div><p className="text-[10px] text-black/40">قیمت</p><p className="mt-1 text-sm font-black">{product.available === false ? "به‌زودی" : product.priceLabel}</p></div>
                  <button disabled={product.available === false} onClick={() => addToCart(product)} className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-3 text-xs font-black text-white transition hover:bg-[#1728d8] disabled:cursor-not-allowed disabled:bg-black/15"><Plus size={14} />{product.available === false ? "ناموجود" : "افزودن"}</button>
                </div>
              </div>
            </article>)}
          </div> : <div className="rounded-3xl border border-dashed border-black/20 bg-white/60 p-12 text-center text-sm text-black/50">محصولی با این مشخصات پیدا نشد.</div>}
        </section>

        {/* Closing banner */}
        <section className="relative mt-16 overflow-hidden rounded-[2rem] bg-[#1728d8] px-6 py-10 text-white sm:px-10 sm:py-14">
          <div className="absolute -left-10 -top-24 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div><p className="mb-3 text-xs font-black tracking-[.2em] text-[#f5c84c]">GOOD TECH. GOOD DAYS.</p><h2 className="max-w-xl text-3xl font-black leading-tight sm:text-4xl">یه انتخاب خوب،<br />می‌تونه هر روزت رو بهتر کنه.</h2></div>
            <a href="#products" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#f5c84c] px-6 py-3.5 text-sm font-black text-[#171717] transition hover:-translate-y-1 hover:bg-white">دیدن محصولات <ArrowUpLeft size={17} /></a>
          </div>
        </section>
      </main>

      <footer className="bg-[#111827] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
          <div><p className="text-xl font-black">Panda Shopy<span className="text-[#f5c84c]">.</span></p><p className="mt-3 max-w-sm text-sm leading-7 text-white/45">تکنولوژی خوب قرار نیست پیچیده باشه. ما اینجاییم تا انتخابش ساده‌تر بشه.</p></div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-white/60"><a href="#products" className="hover:text-[#f5c84c]">فروشگاه</a><a href="#products" className="hover:text-[#f5c84c]">محصولات</a><span>درباره ما</span><span>تماس با ما</span><span>قوانین و مقررات</span><span>اینستاگرام</span></div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/30">© 2026 Panda Shopy — ساخته‌شده برای انتخاب‌های بهتر.</div>
      </footer>

      {/* Cart drawer/modal */}
      {cartOpen && <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md" onClick={() => setCartOpen(false)}>
        <aside
          onClick={(event) => event.stopPropagation()}
          className="flex max-h-[calc(100dvh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-[2rem] bg-[#fffdf7] text-[#171717] shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-black/10 px-6 py-5"><div><p className="text-xl font-black">سبد خرید</p><p className="mt-1 text-xs text-black/45">{cartCount} کالا در سبد</p></div><button onClick={() => setCartOpen(false)} className="rounded-full bg-black/5 p-2"><X size={18} /></button></div>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">{cartItems.length === 0 ? <div className="mt-10 rounded-2xl bg-[#f4f1e8] p-8 text-center"><ShoppingBag className="mx-auto mb-3 text-[#1728d8]" size={30} /><p className="font-black">سبدت هنوز خالیه!</p><p className="mt-2 text-sm text-black/45">چندتا محصول جذاب بهش اضافه کن.</p></div> : cartItems.map((item) => <div key={item.title} className="rounded-2xl border border-black/10 bg-white p-4"><div className="flex justify-between gap-3"><div><p className="font-black">{item.title}</p><p className="mt-1 text-xs text-black/45">{formatPrice(item.price)}</p></div><button onClick={() => updateQuantity(item.title, -item.quantity)} className="text-black/35 hover:text-red-500"><X size={17} /></button></div><div className="mt-4 flex items-center justify-between"><div className="flex items-center gap-3 rounded-full bg-[#f4f1e8] p-1"><button onClick={() => updateQuantity(item.title, -1)} className="rounded-full p-1.5 hover:bg-white"><Minus size={14} /></button><span className="min-w-4 text-center text-sm font-black">{item.quantity}</span><button onClick={() => updateQuantity(item.title, 1)} className="rounded-full p-1.5 hover:bg-white"><Plus size={14} /></button></div><p className="text-sm font-black">{formatPrice(item.price * item.quantity)}</p></div></div>)}</div>
          <div className="border-t border-black/10 bg-white p-6"><div className="mb-4 flex justify-between text-sm"><span className="text-black/50">مبلغ قابل پرداخت</span><strong className="text-lg font-black">{formatPrice(totalPrice)}</strong></div><button disabled={!cartItems.length} className="w-full rounded-full bg-[#1728d8] py-4 text-sm font-black text-white transition hover:bg-[#111827] disabled:bg-black/15">ادامه فرایند خرید</button></div>
        </aside>
      </div>}

      {/* Profile modal */}
      {profileOpen && <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setProfileOpen(false)}>
        <div onClick={(event) => event.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-[#fffdf7] p-6 text-[#171717] shadow-2xl sm:p-8">
          <div className="flex items-start justify-between"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5c84c]"><User size={25} /></div><div><h2 className="text-xl font-black">حساب کاربری</h2><p className="mt-1 text-sm text-black/45">خوش اومدی به پاندا شاپی</p></div></div><button onClick={() => setProfileOpen(false)} className="rounded-full bg-black/5 p-2"><X size={18} /></button></div>
          <div className="mt-7 grid gap-5 md:grid-cols-2"><section className="rounded-2xl bg-[#f4f1e8] p-5"><h3 className="font-black">آخرین سفارش‌ها</h3><div className="mt-4 space-y-3">{profileOrders.map((order) => <div key={order.id} className="rounded-xl bg-white p-3"><div className="flex justify-between gap-2"><strong className="text-sm">{order.product}</strong><span className="text-[10px] font-bold text-[#1728d8]">{order.status}</span></div><p className="mt-2 text-xs text-black/40">{order.id} · {order.date}</p></div>)}</div></section>
            <section className="rounded-2xl bg-[#f4f1e8] p-5"><h3 className="font-black">علاقه‌مندی‌ها <span className="text-[#1728d8]">({favorites.length})</span></h3><div className="mt-4 space-y-2">{favorites.length ? favorites.map((title) => <div key={title} className="flex items-center justify-between rounded-xl bg-white p-3 text-sm font-bold"><span>{title}</span><button onClick={() => toggleFavorite(title)} className="text-black/35 hover:text-red-500"><X size={16} /></button></div>) : <p className="rounded-xl bg-white p-4 text-sm text-black/40">هنوز چیزی ذخیره نکردی.</p>}</div></section></div>
        </div>
      </div>}

      {toast && <div className="fixed bottom-6 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-bold text-white shadow-2xl"><Check size={16} className="text-[#f5c84c]" />{toast}<button onClick={() => setCartOpen(true)} className="mr-2 text-[#f5c84c] underline underline-offset-4">سبد خرید</button></div>}
      <ChatBox />
    </div>
  );
}
