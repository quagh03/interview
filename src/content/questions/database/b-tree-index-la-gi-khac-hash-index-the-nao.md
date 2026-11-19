---
title: "B-Tree Index là gì? Khác Hash Index thế nào?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index","B-Tree"]
order: 151
---

- B-Tree cân bằng, mỗi node chứa nhiều key. Hỗ trợ `=`, range, prefix `LIKE 'abc%'`, và `ORDER BY` đúng chiều key.
- Hash Index chỉ tốt cho `=`. Không range, không sort. Không phải index mặc định của MySQL/PostgreSQL.
