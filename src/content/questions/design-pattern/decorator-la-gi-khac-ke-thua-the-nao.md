---
title: "Decorator là gì? Khác kế thừa thế nào?"
topic: "Design Pattern"
section: "Structural"
level: mid
tags: ["Structural","Decorator"]
order: 310
---

- Bọc một object cùng interface và thêm việc trước hoặc sau, không sửa class gốc.
- `LoggingPayment` implements `PaymentGateway`, giữ một `PaymentGateway` bên trong, ghi log rồi gọi `delegate.charge()`.
- Ghép lúc chạy được. Có thể chồng log, retry và metric mà không tạo một đống subclass.
- `BufferedInputStream` bọc `FileInputStream` là Decorator trong JDK.
