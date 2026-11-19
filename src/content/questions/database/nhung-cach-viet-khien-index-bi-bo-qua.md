---
title: "Những cách viết khiến Index bị bỏ qua?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index"]
order: 154
---

- Bọc cột bằng hàm: `WHERE YEAR(created_at) = 2024`, `WHERE LOWER(email) = 'a@b.com'`. Sửa thành range `created_at >= '2024-01-01' AND created_at < '2025-01-01'`, hoặc lưu sẵn cột đã chuẩn hóa.
- `LIKE '%abc'`. `LIKE 'abc%'` vẫn dùng được B-Tree.
- Lệch kiểu: cột số so với chuỗi, cột thời gian so với pattern không cùng kiểu. Bind đúng kiểu ở JDBC.
- `OR` trên hai cột khác nhau. Cân nhắc `UNION ALL` mỗi nhánh một index.
- `!=`, `NOT IN`, `NOT LIKE` thường không thu hẹp được khoảng trên cây.
- Điều kiện đúng rất ít dòng nhưng query trả gần hết bảng: optimizer chọn scan vì lookup từng dòng còn đắt hơn.
