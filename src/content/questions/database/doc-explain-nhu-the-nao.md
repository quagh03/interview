---
title: "Đọc `EXPLAIN` như thế nào?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index","EXPLAIN"]
order: 156
---

- `type = ALL`: full scan. `type = ref` / `range` / `eq_ref`: đang đi theo index. `rows`: số dòng ước lượng, không phải số dòng trả về cho client.
- Extra đáng chú ý: `Using filesort` (phải sắp riêng), `Using temporary` (bảng tạm cho `GROUP BY`/`DISTINCT`), `Using index` (covering).
- `EXPLAIN` là plan dự kiến. `EXPLAIN ANALYZE` chạy câu lệnh và báo thời gian cùng số dòng thật. Ước lượng và thực tế lệch xa thì xem lại statistics hoặc dữ liệu lệch.
