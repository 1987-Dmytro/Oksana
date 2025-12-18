
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, LayoutPanelLeft, PhoneCall, CheckCircle2, Phone, Mail, FileDown, Link as LinkIcon, Check } from 'lucide-react';
import { SLIDES, COLORS } from './constants';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Touch handlers for mobile swipe (iOS 18 compatible)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
    }
    
    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  const exportToPDF = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent iOS bounce scroll
    const preventBounce = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchmove', preventBounce, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchmove', preventBounce);
    };
  }, [nextSlide, prevSlide]);

  if (isPrinting) {
    return (
      <div className="bg-slate-950">
        {SLIDES.map((slide, index) => (
          <div key={index} className="print-slide w-full h-screen border-b border-slate-800 p-20 flex items-center justify-center overflow-hidden">
             <div className="max-w-7xl w-full">
               {renderSlide(slide)}
             </div>
          </div>
        ))}
      </div>
    );
  }

  const slide = SLIDES[currentSlide];

  return (
    <div 
      className="h-screen w-screen bg-slate-950 overflow-hidden relative flex flex-col font-sans select-none touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        touchAction: 'pan-y',
      }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {showCopyToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 md:top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-2xl flex items-center gap-2 md:gap-3 text-sm md:text-base font-bold"
          >
            <Check className="w-4 h-4 md:w-5 md:h-5" />
            Посилання скопійовано!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-orange-500/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 p-6 md:p-10 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 flex items-center justify-center rounded-lg shadow-lg shadow-orange-500/20 pointer-events-auto">
            <LayoutPanelLeft className="text-white w-6 h-6" />
          </div>
          <div className="pointer-events-auto">
            <h1 className="text-base md:text-xl font-bold font-header tracking-tighter">B.L.S. TRANS.LOGISTIK</h1>
            <p className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Logistics & Insurance</p>
          </div>
        </div>
        <div className="hidden md:flex gap-3 lg:gap-4 items-center pointer-events-auto">
          <button 
            onClick={copyLink} 
            className="text-sm font-semibold flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 hover:bg-white/10 transition-all bg-white/5 backdrop-blur-md"
            title="Копіювати посилання для клієнта"
          >
            <LinkIcon className="w-4 h-4 text-orange-500" />
            Поділитися
          </button>
          <button 
            onClick={exportToPDF} 
            className="text-sm font-semibold flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 hover:bg-white/10 transition-all bg-white/5 backdrop-blur-md"
            title="Завантажити у форматі PDF"
          >
            <FileDown className="w-4 h-4 text-orange-500" />
            PDF Експорт
          </button>
          <button className="bg-white text-slate-900 px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all shadow-xl active:scale-95">
            <PhoneCall className="w-4 h-4" />
            Консультація
          </button>
        </div>
      </header>

      {/* Slides Container */}
      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="w-full h-full max-w-7xl px-6 md:px-12 flex items-center"
          >
            {renderSlide(slide)}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <nav className="fixed bottom-10 left-0 right-0 z-50 px-10 flex justify-between items-center">
        <div className="flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all rounded-full ${
                currentSlide === idx ? 'w-12 bg-orange-500' : 'w-4 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition-all text-white backdrop-blur-sm shadow-lg active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 transition-all text-white shadow-xl shadow-orange-500/20 active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Slide Counter */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-slate-500 font-mono text-sm font-bold tracking-widest opacity-50">
        {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>
    </div>
  );
};

const renderSlide = (slide: any) => {
  switch (slide.type) {
    case 'hero':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          <div className="space-y-6 md:space-y-8">
            <span className="px-4 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-bold tracking-widest uppercase border border-orange-500/20 inline-block">
              Ваш надійний логістичний партнер
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-black font-header leading-[1.1]">
              Захист <br /> 
              <span className="text-orange-500">у Дорозі</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/30 transition-all active:scale-95">
                Отримати аудит
              </button>
              <button className="border border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-slate-900 transition-all active:scale-95">
                Наші рішення
              </button>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-[40px] rotate-3 -z-10 blur-2xl" />
            <img 
              src={slide.image} 
              className="w-full h-[350px] md:h-[500px] object-cover rounded-[40px] shadow-2xl border border-white/5" 
              alt="Truck"
            />
          </div>
        </div>
      );
    case 'split':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
          <div className="space-y-8 md:space-y-10">
            <h2 className="text-4xl md:text-5xl font-black font-header leading-tight">{slide.title}</h2>
            <div className="space-y-6 md:space-y-8">
              {slide.content.map((item: any, i: number) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 group-hover:border-orange-500/50 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{item.title}</h4>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group mt-8 md:mt-0">
            <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <img src={slide.image} className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full aspect-[4/3] object-cover border border-white/10" alt="Context" />
          </div>
        </div>
      );
    case 'grid':
      return (
        <div className="w-full space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black font-header mb-4">{slide.title}</h2>
            <p className="text-slate-400 text-base md:text-lg">Комплексний підхід до кожного вантажу та маршруту.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {slide.content.map((item: any, i: number) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[32px] hover:bg-slate-800/50 hover:border-orange-500/30 transition-all group backdrop-blur-xl hover:-translate-y-2 duration-300">
                <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all">
                   {React.cloneElement(item.icon, { className: 'w-7 h-7' })}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'tiers':
      return (
        <div className="w-full space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black font-header">{slide.title}</h2>
            <p className="text-slate-400 text-lg">{slide.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {slide.content.map((tier: any, i: number) => (
              <div key={i} className={`relative p-1 rounded-[40px] ${tier.popular ? 'bg-gradient-to-b from-orange-500 to-transparent shadow-2xl shadow-orange-500/20' : 'bg-slate-800'}`}>
                <div className="bg-slate-900 rounded-[38px] p-10 h-full flex flex-col items-center text-center">
                  {tier.popular && (
                    <span className="absolute -top-4 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Найпопулярніший</span>
                  )}
                  <h4 className="text-2xl font-bold mb-8 uppercase tracking-widest">{tier.name}</h4>
                  <ul className="space-y-4 mb-10 w-full">
                    {tier.features.map((f: string, j: number) => (
                      <li key={j} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className={`w-5 h-5 ${tier.popular ? 'text-orange-500' : 'text-slate-500'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`mt-auto w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${tier.popular ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>Обрати пакет</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'case':
      return (
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">
           <div className="relative">
              <img src={slide.image} className="rounded-[40px] shadow-2xl w-full h-[500px] object-cover" alt="Case study" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent rounded-[40px] flex items-end p-12">
                 <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                    <p className="text-white text-3xl font-black">€18,000</p>
                    <p className="text-white/60 text-xs uppercase font-bold tracking-widest">Виплачено клієнту</p>
                 </div>
              </div>
           </div>
           <div className="space-y-12">
              <h2 className="text-5xl font-black font-header leading-tight">{slide.title}</h2>
              <div className="space-y-10">
                 <div className="relative pl-8 border-l-2 border-orange-500/30">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
                    <h5 className="text-xs uppercase font-black text-orange-500 tracking-widest mb-2">Клієнт</h5>
                    <p className="text-lg text-slate-300">{slide.content.client}</p>
                 </div>
                 <div className="relative pl-8 border-l-2 border-orange-500/30">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-700" />
                    <h5 className="text-xs uppercase font-black text-slate-500 tracking-widest mb-2">Проблема</h5>
                    <p className="text-lg text-slate-300">{slide.content.problem}</p>
                 </div>
                 <div className="relative pl-8 border-l-2 border-orange-500/30">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                    <h5 className="text-xs uppercase font-black text-emerald-500 tracking-widest mb-2">Рішення</h5>
                    <p className="text-lg text-slate-300 font-semibold">{slide.content.solution}</p>
                 </div>
              </div>
           </div>
        </div>
      );
    case 'steps':
      return (
        <div className="w-full space-y-16">
           <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-black font-header mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl text-slate-400">Ми цінуємо ваш час. Швидкість та прозорість — наші пріоритети.</p>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
              {slide.content.map((item: any, i: number) => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[32px] space-y-4 relative group hover:border-orange-500/50 transition-all hover:bg-slate-800/80">
                   <span className="text-6xl font-black text-slate-800/30 absolute top-4 right-6 font-header group-hover:text-orange-500/10 transition-colors">
                    {item.step}
                   </span>
                   <h4 className="text-2xl font-bold relative z-10">{item.title}</h4>
                   <p className="text-slate-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
                   <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                      <ChevronRight className="w-5 h-5" />
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
    case 'partners':
      return (
        <div className="w-full space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black font-header">{slide.title}</h2>
            <p className="text-slate-400 text-xl">Співпрацюємо лише з лідерами ринку для забезпечення вашої безпеки.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {slide.content.map((partner: any, i: number) => (
              <div key={i} className="bg-white p-12 rounded-[40px] flex flex-col items-center justify-center text-center group hover:shadow-2xl hover:shadow-orange-500/10 transition-all hover:-translate-y-2">
                 <div className="h-16 flex items-center justify-center mb-6">
                    <span className="text-3xl font-black text-slate-900 font-header group-hover:text-orange-500 transition-colors">{partner.name}</span>
                 </div>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'contact':
      return (
        <div className="w-full grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h2 className="text-7xl font-black font-header leading-[1.1]">{slide.title}</h2>
            <p className="text-2xl text-slate-400 leading-relaxed">{slide.subtitle}</p>
            <div className="space-y-6">
               <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-all">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h6 className="text-xs uppercase text-slate-500 font-black tracking-widest mb-1">Телефон</h6>
                    <p className="text-2xl font-bold group-hover:text-orange-500 transition-colors">{slide.content.phone}</p>
                  </div>
               </div>
               <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-all">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h6 className="text-xs uppercase text-slate-500 font-black tracking-widest mb-1">Email</h6>
                    <p className="text-2xl font-bold group-hover:text-orange-500 transition-colors">{slide.content.email}</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-[50px] shadow-2xl relative">
             <h3 className="text-3xl font-bold mb-8">Залиште заявку на безкоштовний аудит</h3>
             <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder="Ваше ім'я" className="w-full bg-slate-800/50 border border-slate-700 p-5 rounded-2xl focus:outline-none" />
                <input type="tel" placeholder="Номер телефону" className="w-full bg-slate-800/50 border border-slate-700 p-5 rounded-2xl focus:outline-none" />
                <button className="w-full bg-orange-500 py-5 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all">Отримати розрахунок</button>
             </form>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default App;
