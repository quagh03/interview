---
title: "Chuẩn hóa 1NF, 2NF, 3NF là gì? Khi nào denormalize?"
topic: "Database"
section: "Database cơ bản"
level: mid
tags: ["Schema","Chuẩn hóa"]
order: 140
---

- 1NF: mỗi ô một giá trị, không nhét danh sách vào một cột.
- 2NF: không có cột phụ thuộc vào một phần của khóa tổ hợp. Ví dụ bảng điểm `(student_id, course_id)` thì tên sinh viên không được đứng ở đây.
- 3NF: cột không khóa không phụ thuộc lẫn nhau. Thành phố không nên suy ra từ cột mã bưu điện nằm cùng bảng khách hàng nếu mã bưu điện không phải khóa.
- Denormalize khi đọc áp đảo ghi và JOIN quá đắt: lưu `customer_name` trên `orders`, lưu bảng tổng hợp doanh thu theo ngày. Phải chấp nhận cập nhật nhiều chỗ và có cách đồng bộ.
