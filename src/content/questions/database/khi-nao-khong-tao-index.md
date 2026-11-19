---
title: "Khi nào không tạo Index?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index"]
order: 148
---

- Bảng vài trăm dòng: scan rẻ hơn chi phí dò cây.
- Cột ít giá trị (`status` chỉ có 2–3 trạng thái) nếu không đứng cùng cột chọn lọc cao.
- Cột hầu như không nằm trong điều kiện lọc nhưng bị cập nhật liên tục.
- Index mới có leftmost prefix trùng index đã tồn tại.
