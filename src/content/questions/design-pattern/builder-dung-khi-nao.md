---
title: "Builder dùng khi nào?"
topic: "Design Pattern"
section: "Creational"
level: junior
tags: ["Creational","Builder"]
order: 308
---

- Dùng khi object có nhiều field tùy chọn. Constructor nhiều tham số dễ đảo thứ tự và khó đọc.
- Gọi theo tên: `User.builder().email(email).role(role).build()`.
- `build()` là chỗ kiểm tra field bắt buộc. Thiếu email thì ném lỗi, không trả object dở.
- Khác Factory: Factory chọn class nào để tạo. Builder lắp từng phần của một class.
