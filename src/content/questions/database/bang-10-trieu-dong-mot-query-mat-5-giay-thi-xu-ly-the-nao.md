---
title: "Bảng 10 triệu dòng, một query mất 5 giây thì xử lý thế nào?"
topic: "Database"
section: "Tối ưu câu SQL"
level: senior
tags: ["Tối ưu SQL"]
order: 182
---

- Xem plan trước, không thêm index cảm tính.
- Thu hẹp cột trả về và điều kiện lọc. Index đúng cụm `(điều kiện bằng, cột sort)`.
- Bỏ `OFFSET` lớn. Tách báo cáo sang bảng tổng hợp hoặc replica đọc.
- Nếu vẫn phải quét phần lớn bảng thì index không cứu được; đổi cách truy cập (lọc theo ngày, partition, bảng archive).
