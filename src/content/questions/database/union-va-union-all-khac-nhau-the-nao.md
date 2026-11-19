---
title: "`UNION` và `UNION ALL` khác nhau thế nào?"
topic: "Database"
section: "Câu lệnh SELECT"
level: junior
tags: ["SELECT"]
order: 160
---

- `UNION` gộp rồi loại trùng, phải sort hoặc hash.
- `UNION ALL` nối kết quả, giữ dòng trùng, rẻ hơn. Dùng khi hai nhánh đã loại trừ nhau hoặc cần giữ trùng.
