import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const pricingPlans = [
    {
      title: "Прайс 50",
      price: "50 000 ₽",
      deposit: "5 000 ₽",
      features: ["Базовый пакет", "Технический саппорт", "Быстрый вывод средств"]
    },
    {
      title: "Прайс 100",
      price: "100 000 ₽",
      deposit: "10 000 ₽",
      features: ["Расширенный пакет", "Приоритетная поддержка", "Бонусные условия"],
      popular: true
    },
    {
      title: "Прайс 200",
      price: "200 000 ₽",
      deposit: "20 000 ₽",
      features: ["Премиум пакет", "VIP поддержка 24/7", "Максимальные лимиты"]
    }
  ];

  const partners = [
    { name: "UO X", logo: "💎" },
    { name: "Vavada", logo: "🎰" },
    { name: "LuckyDuck", logo: "🦆" },
    { name: "1WIN", logo: "🏆" }
  ];

  const testimonials = [
    {
      name: "Александр М.",
      text: "Работаю уже полгода, выплаты всегда вовремя. Отличные условия!",
      rating: 5
    },
    {
      name: "Дмитрий К.",
      text: "Профессиональная команда, быстрая техподдержка. Рекомендую!",
      rating: 5
    },
    {
      name: "Сергей В.",
      text: "Лучшие условия на рынке, реально работающая схема.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">ЗАЛИВЫ PRO</h1>
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-foreground hover:text-primary transition-colors">
                Прайс
              </button>
              <button onClick={() => scrollToSection('partners')} className="text-foreground hover:text-primary transition-colors">
                Партнеры
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-foreground hover:text-primary transition-colors">
                Отзывы
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-foreground hover:text-primary transition-colors">
                Контакты
              </button>
            </div>
            <Button onClick={() => scrollToSection('contacts')}>
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/923a3d71-979d-4553-93ee-9c99e3c0e29c/files/ef6992b5-f0f2-4751-af06-0a56cb3c7954.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ПРОФЕССИОНАЛЬНЫЕ ЗАЛИВЫ
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Работаем с топовыми платформами: UO X, Vavada, LuckyDuck, 1WIN
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection('pricing')} className="text-lg">
                <Icon name="TrendingUp" className="mr-2" size={20} />
                Посмотреть тарифы
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')} className="text-lg">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Получить консультацию
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Тарифные планы</h2>
            <p className="text-xl text-muted-foreground">Выберите подходящий вариант для старта</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:scale-105 transition-transform duration-300 ${
                  plan.popular ? 'border-primary shadow-lg shadow-primary/20' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      ПОПУЛЯРНЫЙ
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.title}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-foreground mt-2">
                    {plan.price}
                  </CardDescription>
                  <p className="text-secondary font-semibold">Депозит: {plan.deposit}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Icon name="CheckCircle2" className="text-primary" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши партнеры</h2>
            <p className="text-xl text-muted-foreground">Надежные и проверенные платформы</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <Card 
                key={index} 
                className="hover:scale-105 transition-transform duration-300 hover:border-primary cursor-pointer"
              >
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <div className="text-6xl mb-4">{partner.logo}</div>
                  <h3 className="text-xl font-bold text-center">{partner.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">Реальный опыт наших партнеров</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={20} />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Связаться с нами</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Готовы начать? Напишите нам для обсуждения условий сотрудничества
            </p>
            
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 justify-center">
                    <Icon name="Send" className="text-primary" size={24} />
                    <a href="https://t.me/username" className="text-xl hover:text-primary transition-colors">
                      Telegram: @zalivypro
                    </a>
                  </div>
                  <div className="flex items-center gap-4 justify-center">
                    <Icon name="Mail" className="text-primary" size={24} />
                    <a href="mailto:info@zalivypro.com" className="text-xl hover:text-primary transition-colors">
                      info@zalivypro.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4 justify-center">
                    <Icon name="Phone" className="text-primary" size={24} />
                    <span className="text-xl">+7 (XXX) XXX-XX-XX</span>
                  </div>
                </div>
                
                <Button size="lg" className="w-full mt-8">
                  <Icon name="MessageSquare" className="mr-2" size={20} />
                  Написать в Telegram
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground">
              © 2024 ЗАЛИВЫ PRO. Все права защищены.
            </div>
            <div className="flex gap-6">
              <button onClick={() => scrollToSection('home')} className="text-muted-foreground hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-muted-foreground hover:text-primary transition-colors">
                Прайс
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-muted-foreground hover:text-primary transition-colors">
                Контакты
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
