---
title: "Strategy là gì?"
topic: "Design Pattern"
section: "Behavioral"
level: junior
tags: ["Behavioral","Strategy"]
order: 312
---

- Tách thuật toán có thể thay ra một interface. Context giữ `DiscountPolicy` và gọi `apply(total)`.
- Thêm kiểu khuyến mãi là thêm class mới, không thêm `if` trong `Order`.
- Đưa strategy từ ngoài vào nên test từng thuật toán một cách riêng.
- Khác Template Method: Strategy đổi cả thuật toán bằng composition. Template Method để subclass điền một bước trong khung của class cha.
