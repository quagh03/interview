---
title: "INNER JOIN và LEFT JOIN khác nhau ở kết quả nào?"
topic: "Database"
section: "JOIN"
level: junior
tags: ["JOIN"]
order: 168
---

- INNER loại dòng trái không có cặp.
- LEFT giữ dòng trái. Muốn "bên trái chưa có bên phải" thì thêm `AND right_table.id IS NULL`.
- Đếm user kể cả user chưa có đơn phải dùng LEFT JOIN. INNER JOIN làm mất user chưa mua.
