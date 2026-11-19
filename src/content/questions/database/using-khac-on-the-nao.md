---
title: "`USING` khác `ON` thế nào?"
topic: "Database"
section: "JOIN"
level: junior
tags: ["JOIN"]
order: 173
---

- `ON a.user_id = b.id`: tường minh, hai cột khác tên vẫn viết được.
- `USING (user_id)`: hai bảng cùng tên cột, kết quả chỉ giữ một cột `user_id`.
