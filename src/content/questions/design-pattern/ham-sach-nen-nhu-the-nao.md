---
title: "Hàm sạch nên như thế nào?"
topic: "Design Pattern"
section: "Clean Code"
level: junior
tags: ["Clean Code","Function"]
order: 317
---

- Làm một việc, và tên nói đúng việc đó.
- Ngắn đủ để đọc hết mà không phải nhớ nhiều tầng nhánh. Nhánh sâu thì tách hàm.
- Ít tham số. Quá ba tham số thì gom thành object.
- Không vừa trả kết quả vừa sửa một trạng thái ẩn.
- Các dòng trong thân hàm cùng một mức trừu tượng. Đừng vừa gọi `charge()` vừa nối chuỗi SQL.
