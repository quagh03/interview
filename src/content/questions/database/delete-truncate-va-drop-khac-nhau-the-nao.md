---
title: "`DELETE`, `TRUNCATE` và `DROP` khác nhau thế nào?"
topic: "Database"
section: "Database cơ bản"
level: junior
tags: ["Schema"]
order: 142
---

- `DELETE`: xóa từng dòng, chạy trigger, ghi log từng dòng, có `WHERE`, rollback được trong transaction. Chậm trên bảng lớn.
- `TRUNCATE`: xóa toàn bộ dữ liệu, reset identity ở nhiều engine, ít log hơn, thường không chạy trigger từng dòng. Implicit commit ở MySQL.
- `DROP`: xóa luôn cấu trúc bảng, index, constraint.
