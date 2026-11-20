---
title: "Single Responsibility Principle là gì?"
topic: "Design Pattern"
section: "SOLID"
level: junior
tags: ["SOLID","SRP"]
order: 301
---

- Một class chỉ có một lý do để thay đổi, nghĩa là một trách nhiệm với một người ra yêu cầu.
- Vi phạm: `OrderService` vừa tính tiền, vừa gửi email, vừa xuất Excel. Đổi mẫu email thì phải sửa class tính tiền.
- Tách `Pricing` và `OrderMailer`. Nguyên tắc này không có nghĩa mỗi class chỉ được một method.
