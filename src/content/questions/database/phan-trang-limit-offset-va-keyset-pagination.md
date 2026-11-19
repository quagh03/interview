---
title: "Phân trang `LIMIT` / `OFFSET` và keyset pagination?"
topic: "Database"
section: "Câu lệnh SELECT"
level: mid
tags: ["SELECT","Pagination"]
order: 166
---

- `LIMIT 20 OFFSET 100000` vẫn phải đọc và bỏ 100.000 dòng phía trước. Trang càng sâu càng chậm, và bị trùng hoặc mất dòng nếu có insert mới trong lúc chuyển trang.
- Keyset: nhớ mốc trang trước, `WHERE (created_at, id) < (:lastCreatedAt, :lastId) ORDER BY created_at DESC, id DESC LIMIT 20`. Cần index đúng cụm cột sort.
- Offset hợp trang đầu và tập nhỏ. Dữ liệu lớn, cuộn vô hạn thì dùng keyset.
