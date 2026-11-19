---
title: "Điều kiện đặt ở `ON` hay `WHERE`?"
topic: "Database"
section: "JOIN"
level: junior
tags: ["JOIN"]
order: 169
---

- `ON` quyết định hai dòng có ghép được không.
- INNER JOIN: đưa điều kiện sang `WHERE` không đổi kết quả.
- LEFT JOIN: điều kiện của bảng phải đặt ở `WHERE` sẽ xóa các dòng trái bị `NULL`, JOIN biến thành INNER.
- Muốn vừa giữ mọi dòng trái vừa chỉ ghép một phần dòng phải: đặt điều kiện bảng phải trong `ON`.

```sql
-- Giữ mọi user. User không có order ACTIVE vẫn có mặt, cột order là NULL.
SELECT u.id, o.id
FROM users u
LEFT JOIN orders o
  ON o.user_id = u.id
 AND o.status = 'ACTIVE';

-- Chỉ còn user có ít nhất một order ACTIVE.
SELECT u.id, o.id
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.status = 'ACTIVE';
```
