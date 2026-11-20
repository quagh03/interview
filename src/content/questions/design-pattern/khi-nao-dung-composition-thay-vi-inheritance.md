---
title: "Khi nào dùng composition thay vì inheritance?"
topic: "Design Pattern"
section: "Clean Code"
level: junior
tags: ["Clean Code","Composition"]
order: 324
---

- Kế thừa khi đúng quan hệ "là một" và class con giữ nguyên hợp đồng của cha.
- Ghép object khi chỉ muốn dùng lại một phần hành vi. `Car` có `Engine`, không `Car extends Engine`.
- Kế thừa khóa thiết kế sớm. Class con phụ thuộc chi tiết `protected` của cha. Composition đổi phần bên trong được lúc chạy.
- Ưu tiên composition. Dùng kế thừa khi quan hệ is-a đúng, hoặc khi framework bắt buộc điền bước của class cha.
