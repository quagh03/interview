---
title: "`NULL` nghĩa là gì? Vì sao `NULL = NULL` không ra TRUE?"
topic: "Database"
section: "Database cơ bản"
level: junior
tags: ["Schema","NULL"]
order: 139
---

- `NULL` là "không có giá trị", không phải chuỗi rỗng và không phải 0.
- So sánh với `NULL` cho kết quả UNKNOWN, không phải TRUE. Điều kiện `WHERE` chỉ giữ dòng TRUE, nên dòng UNKNOWN bị loại.
- Kiểm tra bằng `IS NULL` / `IS NOT NULL`. Gộp giá trị null bằng `COALESCE(col, 0)`.
- `NOT IN (1, NULL)` gần như không trả dòng nào, vì so sánh với `NULL` thành UNKNOWN. Muốn phủ định an toàn thì dùng `NOT EXISTS`.
