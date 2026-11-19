---
title: "Vì sao hạn chế `SELECT *`?"
topic: "Database"
section: "Câu lệnh SELECT"
level: junior
tags: ["SELECT"]
order: 157
---

Thứ tự logic khi thực thi một câu `SELECT`, khác thứ tự các mệnh đề được viết:
`FROM` (gồm `JOIN`) → `WHERE` → `GROUP BY` → `HAVING` → window function → `SELECT` → `DISTINCT` → `ORDER BY` → `LIMIT` / `OFFSET`
Vì `SELECT` chạy sau `WHERE` và `GROUP BY`, alias trong `SELECT` không dùng được ở `WHERE`. Alias dùng được ở `ORDER BY`.

- Kéo cột thừa qua network và vào bộ nhớ ứng dụng.
- Khó thành covering index.
- Thêm cột ở bảng làm đổi dữ liệu trả về mà code không chủ đích.
- JOIN nhiều bảng dễ trùng tên cột, mapping ORM hoặc `ResultSet` lấy nhầm.
