---
title: "Code smell là gì? Kể vài smell hay gặp."
topic: "Design Pattern"
section: "Clean Code"
level: mid
tags: ["Clean Code","Code smell"]
order: 321
---

- Smell là dấu hiệu nên đọc lại thiết kế, chưa phải là lỗi chắc chắn.
- Long method và danh sách tham số dài.
- God class: một class biết quá nhiều việc.
- Feature envy: method dùng dữ liệu của class khác nhiều hơn dữ liệu của chính nó.
- Shotgun surgery: một yêu cầu nhỏ phải sửa rất nhiều file.
- Primitive obsession: tiền và email nằm rải dưới dạng `double` và `String`.
- Trùng một quy tắc nghiệp vụ ở nhiều nơi.
