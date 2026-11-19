---
title: "`DISTINCT` khác `GROUP BY` thế nào?"
topic: "Database"
section: "Câu lệnh SELECT"
level: junior
tags: ["SELECT","GROUP BY"]
order: 159
---

- `DISTINCT` bỏ các dòng trùng trên đúng các cột đang chọn.
- `GROUP BY` dùng khi cần gom rồi tính `COUNT`, `SUM`, `AVG`, `MAX`.
- `SELECT DISTINCT a, b` gần với `GROUP BY a, b` khi không có aggregate, nhưng `GROUP BY` nói rõ ý định gom nhóm.
