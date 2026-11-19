---
title: "Nhiều Index gây hại gì?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index"]
order: 149
---

- Ghi chậm vì mỗi lần sửa phải cân bằng lại nhiều cây.
- Chiếm disk và bộ nhớ buffer pool, dữ liệu nóng bị đẩy ra.
- Optimizer có thêm plan để chọn sai.
