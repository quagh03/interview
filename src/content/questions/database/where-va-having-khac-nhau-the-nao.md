---
title: "`WHERE` và `HAVING` khác nhau thế nào?"
topic: "Database"
section: "Câu lệnh SELECT"
level: junior
tags: ["SELECT","GROUP BY"]
order: 158
---

- `WHERE` lọc từng dòng trước khi gom nhóm, không dùng hàm aggregate.
- `HAVING` lọc sau `GROUP BY`, nên viết được `HAVING COUNT(*) > 1` hoặc `HAVING SUM(amount) > 1000`.
- Điều kiện lọc được bằng `WHERE` thì để ở `WHERE`, để nhóm ít dòng hơn.
