---
title: "Window function khác `GROUP BY` thế nào?"
topic: "Database"
section: "Câu lệnh SELECT"
level: mid
tags: ["SELECT","Window","GROUP BY"]
order: 165
---

- `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `SUM() OVER (PARTITION BY ...)` tính trên cửa sổ nhưng vẫn giữ từng dòng.
- `GROUP BY` sụt còn một dòng mỗi nhóm.
- Lấy đơn mới nhất của mỗi user: `ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC)` rồi lọc `rn = 1`. `RANK` giữ đồng hạng; `ROW_NUMBER` luôn duy nhất trong partition.
