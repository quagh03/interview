---
title: "Chain of Responsibility là gì?"
topic: "Design Pattern"
section: "Behavioral"
level: mid
tags: ["Behavioral","Chain of Responsibility"]
order: 315
---

- Request đi qua một chuỗi handler. Handler xử lý hoặc chuyển tiếp, không cần biết hết handler phía sau.
- Filter của servlet và `SecurityFilterChain` là dạng này: mỗi filter làm một việc rồi gọi `chain.doFilter()`.
- Khác Decorator. Chain chọn handler nào nhận việc. Decorator thì các lớp bọc đều chạy và mỗi lớp thêm một việc.
