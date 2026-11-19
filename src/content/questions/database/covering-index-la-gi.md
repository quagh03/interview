---
title: "Covering Index là gì?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index","Composite index"]
order: 153
---

- Mọi cột query cần đã nằm trong index, database không lookup về bảng.
- `INDEX (user_id, status)` phủ được `SELECT status FROM orders WHERE user_id = ?`.
- `EXPLAIN` của MySQL hiện `Using index` trong cột Extra khi đó là covering index.
