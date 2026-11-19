---
title: "Composite Index là gì? Vì sao thứ tự cột quan trọng?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index","Composite index"]
order: 152
---

- Một index trên nhiều cột, ví dụ `(user_id, created_at)`.
- Leftmost prefix: index này phục vụ `user_id = ?` và `user_id = ? AND created_at > ?`. Chỉ có `created_at` thì không đi được từ gốc cây này.
- Cột so sánh bằng (`=`, `IN`) đặt trước. Cột range hoặc cột `ORDER BY` đặt sau. Range ở cột giữa sẽ chặn các cột phía sau dùng index.
- Ví dụ danh sách đơn: `WHERE user_id = ? AND status = ? ORDER BY created_at DESC` hợp index `(user_id, status, created_at)`.
