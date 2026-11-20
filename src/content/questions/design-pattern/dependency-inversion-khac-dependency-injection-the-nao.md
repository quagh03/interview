---
title: "Dependency Inversion khác Dependency Injection thế nào?"
topic: "Design Pattern"
section: "SOLID"
level: mid
tags: ["SOLID","DIP"]
order: 305
---

- Dependency Inversion là nguyên tắc: code nghiệp vụ phụ thuộc interface `PaymentGateway`, không `new MomoClient()` bên trong.
- Dependency Injection là kỹ thuật: constructor hoặc Spring đưa implementation vào. Đó là một cách làm DIP.
- Inversion of Control rộng hơn. Framework gọi code của bạn, thay vì bạn điều khiển framework. Spring container là IoC.
