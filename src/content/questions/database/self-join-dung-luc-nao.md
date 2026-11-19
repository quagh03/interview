---
title: "Self JOIN dùng lúc nào?"
topic: "Database"
section: "JOIN"
level: junior
tags: ["JOIN","Self join"]
order: 172
---

- Cùng bảng, vai trò khác nhau: `employees e JOIN employees m ON e.manager_id = m.id`.
- Tìm cặp trùng: JOIN bảng với chính nó theo cột nghi trùng, kèm `a.id < b.id` để mỗi cặp chỉ ra một lần.
- So hai mốc của cùng một khóa: đơn sau và đơn ngay trước của một user.
