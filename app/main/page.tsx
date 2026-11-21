"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Heart, Menu, Search, ShoppingCart, Sparkles, User } from "lucide-react";

type ChatMessage = { sender: "user" | "support"; text: string };

function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "support", text: "سلام! برای راهنمایی بیشتر در خدمت شما هستیم." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    setInput("");

    window.setTimeout(() => {
      setMessages((msgs) => [...msgs, { sender: "support", text: "پشتیبانی: پیام شما دریافت شد و در کوتاه‌ترین زمان پاسخ می‌دهیم." }]);
    }, 900);
  };

  return (
    <>
      <button
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-zinc-700"
        onClick={() => setOpen((value) => !value)}
        aria-label="پشتیبانی آنلاین"
      >
        <Sparkles size={18} />
        <span className="hidden sm:inline">پشتیبانی</span>
      </button>

      {open && (
        <div className="fixed bottom-24 left-6 z-50 flex w-80 max-w-[95vw] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">پشتیبانی آنلاین</p>
              <p className="text-xs text-zinc-400">در حال پاسخگویی</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-1 text-zinc-300 transition hover:bg-zinc-800 hover:text-white">
              ✕
            </button>
          </div>

          <div className="flex h-64 flex-1 flex-col gap-2 overflow-y-auto bg-zinc-50 p-3">
            {messages.map((msg, index) => (
              <div key={`${msg.sender}-${index}`} className={msg.sender === "user" ? "text-left" : "text-right"}>
                <span
                  className={
                    msg.sender === "user"
                      ? "inline-block max-w-[85%] rounded-2xl bg-zinc-900 px-3 py-2 text-sm text-white"
                      : "inline-block max-w-[85%] rounded-2xl bg-zinc-200 px-3 py-2 text-sm text-zinc-800"
                  }
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-zinc-200 bg-white p-3">
            <input
              className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              autoFocus
            />
            <button type="submit" className="rounded-full bg-zinc-900 px-3 py-2 text-sm text-white transition hover:bg-zinc-700">
              ارسال
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default function MainPage() {
  type Product = {
    title: string;
    subtitle: string;
    priceLabel: string;
    priceValue: number;
    badge: string;
    available?: boolean;
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Array<{ title: string; price: number; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [supportNotice, setSupportNotice] = useState("");
  const [cartToast, setCartToast] = useState("");

  const featuredProducts: Product[] = [
    { title: "iPhone 16 Pro", subtitle: "قدرتی شگفت‌انگیز در کنار طراحی بی‌نقص", priceLabel: "از ۷۹,۹۹۹,۰۰۰ تومان", priceValue: 79999000, badge: "جدید" },
    { title: "MacBook Air M3", subtitle: "سبک، سریع و آماده برای هر لحظه", priceLabel: "از ۵۹,۹۹۹,۰۰۰ تومان", priceValue: 59999000, badge: "پرفروش" },
    { title: "AirPods Pro", subtitle: "صدایی واضح‌تر و تجربه‌ای بی‌نظیر", priceLabel: "از ۱۱,۹۹۹,۰۰۰ تومان", priceValue: 11999000, badge: "پیشنهاد ویژه" },
    { title: "iPhone 16", subtitle: "قدرتی شگفت‌انگیز در کنار طراحی بی‌نقص", priceLabel: "از ۷۹,۹۹۹,۰۰۰ تومان", priceValue: 79999000, badge: "جدید" },
    { title: "iPhone 17", subtitle: "قدرتی شگفت‌انگیز در کنار طراحی بی‌نقص", priceLabel: "از 89,۹۹۹,۰۰۰ تومان", priceValue: 79999000, badge: "جدید" }
  ];

  const catalogProducts: Product[] = [
    ...featuredProducts,
    { title: "Apple Watch Ultra 2", subtitle: "نسخه‌ای حرفه‌ای برای ورزش و سفر", priceLabel: "از ۲۹,۹۹۹,۰۰۰ تومان", priceValue: 29999000, badge: "ناموجود", available: false },
    { title: "iPad Pro", subtitle: "برای طراحی، کار و سرگرمی", priceLabel: "از ۴۹,۹۹۹,۰۰۰ تومان", priceValue: 49999000, badge: "ناموجود", available: false },
  ];

  const categories = ["Store", "Mac", "iPad", "iPhone", "Watch", "AirPods", "Support"];

  const highlights = [
    { title: "طراحی مینیمال", text: "نمایی مدرن و شفاف که حس فروشگاه اپل را منتقل می‌کند." },
    { title: "تجربه خرید آسان", text: "جستجو، انتخاب و ثبت سفارش در چند مرحله ساده." },
    { title: "پشتیبانی سریع", text: "پشتیبانی آنلاین و پاسخگویی لحظه‌ای در تمام زمان‌ها." },
  ];

  const profileOrders = [
    { id: "#1024", product: "iPhone 16 Pro", status: "تحویل شده", date: "۱۴۰۳/۰۵/۲۱" },
    { id: "#1028", product: "MacBook Air M3", status: "در حال پردازش", date: "۱۴۰۳/۰۵/۲۸" },
    { id: "#1031", product: "AirPods Pro", status: "کنسل شده", date: "۱۴۰۳/۰۶/۰۳" },
  ];

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const filteredProducts = searchQuery.trim()
    ? catalogProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : [];

  const addToCart = (product: Product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.title === product.title);
      if (existingItem) {
        return currentItems.map((item) =>
          item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentItems, { title: product.title, price: product.priceValue, quantity: 1 }];
    });
    setCartToast(`"${product.title}" اضافه شد به سبد خرید`);
    window.setTimeout(() => setCartToast(""), 2500);
  };

  const updateQuantity = (title: string, delta: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => (item.title === title ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const formatPrice = (value: number) => `${value.toLocaleString("fa-IR")} تومان`;

  const toggleFavorite = (product: Product) => {
    setFavoriteProducts((currentFavorites) => {
      const isAlreadyFavorite = currentFavorites.some((favorite) => favorite.title === product.title);
      if (isAlreadyFavorite) {
        return currentFavorites.filter((favorite) => favorite.title !== product.title);
      }
      return [...currentFavorites, product];
    });
  };

  const handleSupportRequest = (productName: string) => {
    setSupportNotice(`درخواست شما برای محصول ${productName} ثبت شد. تیم پشتیبانی در کوتاه‌ترین زمان با شما تماس می‌گیرد.`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100 lg:hidden"
              aria-label="نمایش منو"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                T
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">Panda Shopy</p>
                <p className="text-xs text-zinc-500">New experience for easy shoping</p>
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 lg:flex">
            {categories.map((item) => (
              <a key={item} href="#" className="transition hover:text-zinc-900">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <button
                aria-label="جستجو"
                onClick={() => {
                  setIsSearchOpen((value) => !value);
                  setSupportNotice("");
                }}
                className="rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100"
              >
                <Search size={18} />
              </button>
              {isSearchOpen && (
                <div className="relative">
                  <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 shadow-sm">
                    <Search size={16} className="text-zinc-400" />
                    <input
                      value={searchQuery}
                      onChange={(event) => {
                        setSearchQuery(event.target.value);
                        setSupportNotice("");
                      }}
                      placeholder="جستجوی محصول..."
                      className="w-40 bg-transparent text-sm outline-none sm:w-56"
                      autoFocus
                    />
                    <button
                      aria-label="بستن جستجو"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                        setSupportNotice("");
                      }}
                      className="rounded-full p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      ✕
                    </button>
                  </div>

                  {searchQuery.trim() && (
                    <div className="absolute left-0 right-0 top-14 z-[80] max-h-80 overflow-y-auto rounded-[24px] border border-zinc-200 bg-white p-3 shadow-2xl">
                      {supportNotice && (
                        <div className="mb-3 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                          {supportNotice}
                        </div>
                      )}

                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <div key={product.title} className="rounded-[18px] border border-zinc-200 bg-zinc-50 p-3 last:mb-0">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-semibold text-zinc-900">{product.title}</p>
                                <p className="mt-1 text-sm text-zinc-500">{product.subtitle}</p>
                              </div>
                              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.available === false ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                                {product.available === false ? "ناموجود" : "موجود"}
                              </span>
                            </div>

                            {product.available === false ? (
                              <div className="mt-3 flex items-center justify-between gap-2">
                                <p className="text-sm text-zinc-500">این محصول در حال حاضر موجود نیست.</p>
                                <button
                                  onClick={() => handleSupportRequest(product.title)}
                                  className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-zinc-700"
                                >
                                  درخواست پشتیبانی
                                </button>
                              </div>
                            ) : (
                              <div className="mt-3 flex items-center justify-between gap-2">
                                <span className="text-sm font-semibold text-zinc-900">{product.priceLabel}</span>
                                <button
                                  onClick={() => addToCart(product)}
                                  className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-zinc-700"
                                >
                                  افزودن به سبد
                                </button>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="rounded-[18px] border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-500">
                          محصولی با این نام پیدا نشد. اگر مدنظرتان محصولی است که در فروشگاه نیست، درخواست پشتیبانی بدهید.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              aria-label="پروفایل"
              onClick={() => setIsProfileOpen(true)}
              className="rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100"
            >
              <User size={18} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-zinc-900 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium text-zinc-600">
              {categories.map((item) => (
                <a key={item} href="#" className="transition hover:text-zinc-900">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="overflow-hidden rounded-[32px] bg-zinc-950 text-white shadow-2xl">
          <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-16">
            <div className="flex flex-col justify-center gap-5">
              <span className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-zinc-300">
                جدیدترین لاین‌آپ فروشگاه
              </span>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                تجربه خریدی شبیه اپل، با حس مدرن‌تر.
              </h1>
              <p className="max-w-xl text-lg text-zinc-300">
                از گوشی‌های هوشمند تا لپ‌تاپ‌های پرقدرت، همه چیز در یک صفحه‌ی مینیمال و سریع آماده‌ی انتخاب است.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200">
                  مشاهده محصولات
                </button>
                <button className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  بیشتر بدانید <ArrowLeft size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="rounded-[20px] bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-950 p-6">
                <p className="text-sm text-zinc-300">پرفروش این هفته</p>
                <h2 className="mt-2 text-2xl font-semibold">iPhone 16 Pro Max</h2>
                <p className="mt-3 text-sm text-zinc-400">عالی برای عکاسی، اجرا و کارهای روزمره.</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xl font-semibold">از ۹۹,۹۹۹,۰۰۰ تومان</span>
                  <button
                    onClick={() => addToCart(featuredProducts[0])}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
                  >
                    افزودن به سبد
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {featuredProducts.slice(1).map((product) => (
                  <div key={product.title} className="rounded-[20px] border border-white/10 bg-white/10 p-4">
                    <p className="text-xs text-zinc-400">{product.badge}</p>
                    <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400">{product.subtitle}</p>
                    <p className="mt-4 text-sm font-medium text-white">{product.priceLabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-zinc-500">محصولات منتخب</p>
              <h2 className="text-2xl font-semibold text-zinc-900">برندهای محبوب و جدید</h2>
            </div>
            <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100">
              مشاهده همه
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <div key={product.title} className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">{product.badge}</span>
                  <button
                    aria-label={favoriteProducts.some((favorite) => favorite.title === product.title) ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                    onClick={() => toggleFavorite(product)}
                    className={`rounded-full p-2 transition ${favoriteProducts.some((favorite) => favorite.title === product.title) ? "bg-rose-100 text-rose-600" : "text-zinc-500 hover:bg-white hover:text-zinc-900"}`}
                  >
                    <Heart size={16} fill={favoriteProducts.some((favorite) => favorite.title === product.title) ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="flex h-32 items-center justify-center rounded-[20px] bg-gradient-to-br from-zinc-200 to-zinc-100 text-4xl font-semibold text-zinc-700">
                  {product.title.split(" ")[0]}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900">{product.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{product.subtitle}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-900">{product.priceLabel}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
                  >
                    افزودن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 text-sm text-zinc-600 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold text-zinc-900">Panda Shopy</p>
            <p className="mt-3 max-w-md leading-7">
              فروشگاه مدرن و مینیمال با طراحی الهام‌گرفته از تجربه‌ی برندهای پیشرو.
            </p>
          </div>
          <div>
            <p className="font-semibold text-zinc-900">لینک‌های سریع</p>
            <ul className="mt-3 space-y-2">
              <li>درباره ما</li>
              <li>تماس با ما</li>
              <li>قوانین و مقررات</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-zinc-900">شبکه‌های اجتماعی</p>
            <div className="mt-3 flex gap-3">
              <span className="rounded-full bg-zinc-100 px-3 py-2">Instagram</span>
              <span className="rounded-full bg-zinc-100 px-3 py-2">X</span>
            </div>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
              <div>
                <p className="text-lg font-semibold text-zinc-900">سبد خرید</p>
                <p className="text-sm text-zinc-500">{cartCount} کالا</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-5">
              {cartItems.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-500">
                  سبد خرید شما خالی است.
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.title} className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-zinc-900">{item.title}</p>
                          <p className="mt-1 text-sm text-zinc-500">{formatPrice(item.price)}</p>
                        </div>
                        <button
                          onClick={() => updateQuantity(item.title, -1)}
                          className="rounded-full p-1 text-zinc-500 transition hover:bg-white hover:text-zinc-900"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.title, -1)}
                            className="h-7 w-7 rounded-full text-lg text-zinc-600 transition hover:bg-zinc-100"
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center text-sm font-semibold text-zinc-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.title, 1)}
                            className="h-7 w-7 rounded-full text-lg text-zinc-600 transition hover:bg-zinc-100"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-zinc-900">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-b-[32px] border-t border-zinc-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between text-sm text-zinc-600">
                <span>جمع کل</span>
                <span className="text-lg font-semibold text-zinc-900">{formatPrice(totalPrice)}</span>
              </div>
              <button className="w-full rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700">
                تکمیل خرید
              </button>
            </div>
          </div>
        </div>
      )}

      {isProfileOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-lg font-semibold text-white">
                  AH
                </div>
                <div>
                  <p className="text-xl font-semibold text-zinc-900">امیرحسین قاسمی</p>
                  <p className="mt-1 text-sm text-zinc-500">amir@example.com</p>
                </div>
              </div>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="rounded-full p-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-900">سفارش‌های من</p>
                <div className="mt-4 space-y-3">
                  {profileOrders.map((order) => (
                    <div key={order.id} className="rounded-[18px] border border-zinc-200 bg-white p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-zinc-900">{order.product}</p>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${order.status === "تحویل شده" ? "bg-emerald-100 text-emerald-700" : order.status === "در حال پردازش" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm text-zinc-500">
                        <span>{order.id}</span>
                        <span>{order.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-900">علاقه‌مندی‌ها</p>
                <div className="mt-4 space-y-3">
                  {favoriteProducts.length === 0 ? (
                    <div className="rounded-[18px] border border-dashed border-zinc-300 bg-white p-3 text-sm text-zinc-500">
                      هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.
                    </div>
                  ) : (
                    favoriteProducts.map((product) => (
                      <div key={product.title} className="rounded-[18px] border border-zinc-200 bg-white p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-zinc-900">{product.title}</p>
                            <p className="mt-1 text-sm text-zinc-500">{product.subtitle}</p>
                          </div>
                          <button
                            onClick={() => toggleFavorite(product)}
                            className="rounded-full p-1.5 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                            aria-label={`حذف ${product.title} از علاقه‌مندی‌ها`}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {cartToast && (
        <div className="fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-2xl">
          {cartToast} · <button onClick={() => setIsCartOpen(true)} className="font-semibold text-zinc-900 underline-offset-2 hover:underline">مشاهده سبد</button>
        </div>
      )}

      <ChatBox />
    </div>
  );
}
