---
title: "Template Method khác Strategy thế nào?"
topic: "Design Pattern"
section: "Behavioral"
level: mid
tags: ["Behavioral","Template Method"]
order: 314
---

- Template Method: class cha viết `process()` dạng `final`, rồi gọi các bước `abstract`. Subclass chỉ điền bước còn trống. Khung nằm ở cha và dùng kế thừa.
- Strategy: context nhận một interface và đổi cả thuật toán bằng object đưa từ ngoài.
- Chọn Strategy khi cần đổi lúc chạy, hoặc khi muốn test từng thuật toán không qua class cha.
