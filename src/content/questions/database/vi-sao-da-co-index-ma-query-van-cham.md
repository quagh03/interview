---
title: "Vì sao đã có Index mà query vẫn chậm?"
topic: "Database"
section: "Tối ưu câu SQL"
level: senior
tags: ["Tối ưu SQL","Index"]
order: 181
---

- Index không phủ đúng leftmost prefix của điều kiện thực tế.
- Điều kiện khớp quá nhiều dòng, optimizer chọn scan hoặc chọn index rồi lookup hàng triệu dòng.
- Phải `filesort` / tạo bảng tạm vì `ORDER BY` và `GROUP BY` không trùng thứ tự index.
- Khóa ngoại và index phụ làm một giao dịch ghi chờ lock. Chậm do chờ, không phải do thiếu index.
- Statistics cũ, hoặc lần đầu gọi phải đọc dữ liệu từ đĩa vì chưa nằm trong buffer pool.
