import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      setIsLoggedIn(true);
      toast({
        title: "Вход выполнен!",
        description: "Добро пожаловать в личный кабинет",
      });
    }
  };

  const handlePayment = (method: string) => {
    toast({
      title: "Платёж обрабатывается",
      description: `Оплата через ${method === 'card' ? 'карту' : 'номер телефона'}`,
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано!",
      description: `${label} скопирован в буфер обмена`,
    });
  };

  const pricingPlans = [
    {
      id: "50",
      title: "Прайс 50",
      price: "50 000 ₽",
      deposit: "5 000 ₽",
      features: ["Базовый пакет", "Технический саппорт", "Быстрый вывод средств"]
    },
    {
      id: "100",
      title: "Прайс 100",
      price: "100 000 ₽",
      deposit: "10 000 ₽",
      features: ["Расширенный пакет", "Приоритетная поддержка", "Бонусные условия"],
      popular: true
    },
    {
      id: "200",
      title: "Прайс 200",
      price: "200 000 ₽",
      deposit: "20 000 ₽",
      features: ["Премиум пакет", "VIP поддержка 24/7", "Максимальные лимиты"]
    }
  ];

  const partners = [
    { name: "UPX", logo: "💎" },
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

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary">ЗАЛИВЫ PRO</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Личный кабинет</span>
                <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
                  <Icon name="LogOut" className="mr-2" size={16} />
                  Выход
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Добро пожаловать!</h2>
              <p className="text-muted-foreground">Выберите тариф и произведите оплату</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {pricingPlans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedPlan === plan.id ? 'border-primary shadow-lg shadow-primary/20' : ''
                  } ${plan.popular ? 'border-primary/50' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                        ПОПУЛЯРНЫЙ
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.title}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-foreground mt-2">
                      {plan.price}
                    </CardDescription>
                    <p className="text-primary font-semibold text-sm">Депозит: {plan.deposit}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Icon name="CheckCircle2" className="text-primary" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedPlan && (
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={24} />
                    Оплата выбранного тарифа
                  </CardTitle>
                  <CardDescription>
                    Выбран тариф: {pricingPlans.find(p => p.id === selectedPlan)?.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="card">
                        <Icon name="CreditCard" className="mr-2" size={16} />
                        По карте
                      </TabsTrigger>
                      <TabsTrigger value="phone">
                        <Icon name="Phone" className="mr-2" size={16} />
                        По телефону
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label>Номер карты для перевода</Label>
                        <div className="flex gap-2">
                          <Input 
                            value="2200 7019 3663 7526" 
                            readOnly 
                            className="font-mono text-lg"
                          />
                          <Button 
                            onClick={() => copyToClipboard("2200701936637526", "Номер карты")}
                            variant="outline"
                          >
                            <Icon name="Copy" size={18} />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Переведите {pricingPlans.find(p => p.id === selectedPlan)?.deposit} на указанную карту
                        </p>
                      </div>
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => handlePayment('card')}
                      >
                        <Icon name="CheckCircle" className="mr-2" size={20} />
                        Я оплатил
                      </Button>
                    </TabsContent>

                    <TabsContent value="phone" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label>Номер телефона для перевода</Label>
                        <div className="flex gap-2">
                          <Input 
                            value="+7 (982) 214-16-78" 
                            readOnly 
                            className="font-mono text-lg"
                          />
                          <Button 
                            onClick={() => copyToClipboard("79822141678", "Номер телефона")}
                            variant="outline"
                          >
                            <Icon name="Copy" size={18} />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Переведите {pricingPlans.find(p => p.id === selectedPlan)?.deposit} на указанный номер
                        </p>
                      </div>
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => handlePayment('phone')}
                      >
                        <Icon name="CheckCircle" className="mr-2" size={20} />
                        Я оплатил
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            <Card className="mt-8 border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Headphones" size={24} />
                  Связь с поддержкой
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1" size="lg" asChild>
                    <a href="https://t.me/zalivypro" target="_blank" rel="noopener noreferrer">
                      <Icon name="Send" className="mr-2" size={20} />
                      Написать в Telegram
                    </a>
                  </Button>
                  <Button className="flex-1" size="lg" variant="outline" asChild>
                    <a href="mailto:support@zalivypro.com">
                      <Icon name="Mail" className="mr-2" size={20} />
                      Отправить Email
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Поддержка работает 24/7 • Среднее время ответа: 5 минут
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Icon name="LogIn" className="mr-2" size={18} />
                  Личный кабинет
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Вход в личный кабинет</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Логин</Label>
                    <Input
                      id="username"
                      placeholder="Введите логин"
                      value={loginData.username}
                      onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Введите пароль"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="LogIn" className="mr-2" size={20} />
                    Войти
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
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
              Работаем с топовыми платформами: UPX, Vavada, LuckyDuck, 1WIN
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg">
                    <Icon name="TrendingUp" className="mr-2" size={20} />
                    Начать работу
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Вход в личный кабинет</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleLogin} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="username2">Логин</Label>
                      <Input
                        id="username2"
                        placeholder="Введите логин"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password2">Пароль</Label>
                      <Input
                        id="password2"
                        type="password"
                        placeholder="Введите пароль"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Icon name="LogIn" className="mr-2" size={20} />
                      Войти
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                        Выбрать план
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Вход в личный кабинет</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleLogin} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor={`username-${index}`}>Логин</Label>
                          <Input
                            id={`username-${index}`}
                            placeholder="Введите логин"
                            value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`password-${index}`}>Пароль</Label>
                          <Input
                            id={`password-${index}`}
                            type="password"
                            placeholder="Введите пароль"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" size="lg">
                          <Icon name="LogIn" className="mr-2" size={20} />
                          Войти
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
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
                    <a href="https://t.me/zalivypro" className="text-xl hover:text-primary transition-colors">
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
                    <span className="text-xl">+7 (982) 214-16-78</span>
                  </div>
                </div>
                
                <Button size="lg" className="w-full mt-8" asChild>
                  <a href="https://t.me/zalivypro" target="_blank" rel="noopener noreferrer">
                    <Icon name="MessageSquare" className="mr-2" size={20} />
                    Написать в Telegram
                  </a>
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
