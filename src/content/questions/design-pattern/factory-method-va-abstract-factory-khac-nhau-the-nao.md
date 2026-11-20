---
title: "Factory Method và Abstract Factory khác nhau thế nào?"
topic: "Design Pattern"
section: "Creational"
level: mid
tags: ["Creational","Factory"]
order: 307
---

- Factory Method là một method tạo một sản phẩm. Subclass hoặc implementation quyết định class cụ thể, ví dụ `PaymentFactory.create()` trả về `Payment`.
- Abstract Factory là một object tạo cả họ sản phẩm phải đi cùng nhau. `UiFactory` tạo `Button` và `Checkbox` cùng kiểu Windows hoặc cùng kiểu Mac.
- Factory Method chọn một class. Abstract Factory giữ một bộ class cho khớp nhau.
