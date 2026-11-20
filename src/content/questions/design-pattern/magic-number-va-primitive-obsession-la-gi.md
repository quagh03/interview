---
title: "Magic number và primitive obsession là gì?"
topic: "Design Pattern"
section: "Clean Code"
level: junior
tags: ["Clean Code","Primitive obsession"]
order: 322
---

- `if (status == 3)` không cho người đọc biết `3` là trạng thái nào. Dùng `OrderStatus.PAID` hoặc một hằng có tên.
- Tiền để `double` thì sai số làm tròn. Email để `String` thì mỗi nơi tự kiểm tra một kiểu.
- Khi một giá trị có luật riêng, gom thành type nhỏ như `Money` hoặc `Email`. Không cần bọc mọi biến.
