---
title: "Nhiều request cùng cập nhật một tài khoản thì tránh lost update thế nào?"
topic: "Database"
section: "Tối ưu câu SQL"
level: senior
tags: ["Tối ưu SQL","Lost update"]
order: 184
---

- Một câu `UPDATE` có điều kiện số dư, kiểm tra số dòng bị ảnh hưởng.
- Không đọc số dư lên ứng dụng rồi ghi đè bằng giá trị đã tính ở JVM.
- Giữ transaction ngắn. Khóa hàng theo cùng một thứ tự nếu một luồng sửa nhiều tài khoản, để tránh deadlock.
