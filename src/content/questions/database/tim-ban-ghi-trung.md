---
title: "Tìm bản ghi trùng?"
topic: "Database"
section: "Tối ưu câu SQL"
level: senior
tags: ["Tối ưu SQL"]
order: 183
---

```sql
SELECT email, COUNT(*) AS dup
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```
