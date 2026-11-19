---
title: "Cardinality, Selectivity và statistics là gì?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index","EXPLAIN"]
order: 155
---

- Cardinality: số giá trị khác nhau của cột hoặc của index.
- Selectivity: phần dòng bị loại bởi điều kiện. Càng chọn lọc, index càng có lợi.
- Optimizer dựa vào statistics. Thống kê cũ làm nó ước lượng sai và bỏ index. Chạy `ANALYZE` sau khi nạp dữ liệu lớn hoặc phân phối thay đổi mạnh.
