---
title: "Nhiều JOIN một-nhiều thì kết quả phình thế nào?"
topic: "Database"
section: "JOIN"
level: junior
tags: ["JOIN"]
order: 171
---

- `users → orders → order_items`: một user thành rất nhiều dòng. `COUNT` hoặc `SUM` trực tiếp trên kết quả này bị tính trùng.
- Gom bảng con trước, rồi JOIN kết quả đã còn một dòng mỗi khóa:

```sql
SELECT u.id, COALESCE(s.total_amount, 0) AS total_amount
FROM users u
LEFT JOIN (
    SELECT user_id, SUM(amount) AS total_amount
    FROM orders
    GROUP BY user_id
) s ON s.user_id = u.id;
```
