---
title: "Adapter và Facade khác nhau thế nào?"
topic: "Design Pattern"
section: "Structural"
level: mid
tags: ["Structural","Adapter"]
order: 309
---

- Adapter đổi một interface có sẵn cho khớp interface mình cần. `LegacyXmlClient` được bọc thành `PaymentGateway`. Mục đích là lắp vừa một chỗ không khớp.
- Facade gom nhiều lời gọi thành một method dễ dùng. `CheckoutFacade.place(order)` gọi giá, kho và thanh toán. Mục đích là che độ phức tạp.
- Adapter để khớp. Facade để gọn.
