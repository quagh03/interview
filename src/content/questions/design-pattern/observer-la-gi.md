---
title: "Observer là gì?"
topic: "Design Pattern"
section: "Behavioral"
level: junior
tags: ["Behavioral","Observer"]
order: 313
---

- Khi một đối tượng đổi trạng thái, nó báo cho những đối tượng đã đăng ký, mà không cần biết các đối tượng đó là class nào.
- `Order` phát sự kiện `OrderPaid`. `EmailListener` và `StockListener` tự đăng ký.
- Trong Spring, cách làm này là `ApplicationEventPublisher` và `@EventListener`.
- Listener chạy đồng bộ sẽ kéo chậm luồng chính. Listener ném lỗi có thể chặn listener đăng ký sau nó.
