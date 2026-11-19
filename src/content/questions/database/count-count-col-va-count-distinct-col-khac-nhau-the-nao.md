---
title: "`COUNT(*)`, `COUNT(col)` và `COUNT(DISTINCT col)` khác nhau thế nào?"
topic: "Database"
section: "Câu lệnh SELECT"
level: junior
tags: ["SELECT"]
order: 164
---

- `COUNT(*)` đếm dòng, kể cả dòng toàn `NULL`.
- `COUNT(col)` bỏ dòng có `col` là `NULL`.
- `COUNT(DISTINCT col)` đếm số giá trị khác nhau, tốn bộ nhớ hơn vì phải khử trùng.
- `COUNT(*)` không đếm "số dòng không null của một cột". Cần ý đó thì đếm đúng cột.
