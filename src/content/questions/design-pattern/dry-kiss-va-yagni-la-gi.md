---
title: "DRY, KISS và YAGNI là gì?"
topic: "Design Pattern"
section: "Clean Code"
level: junior
tags: ["Clean Code","DRY"]
order: 319
---

- DRY: mỗi quy tắc nghiệp vụ nằm ở một nơi. Đổi cách tính thuế thì chỉ sửa một hàm. Hai dòng giống nhau chưa chắc là cùng một quy tắc.
- Gộp quá sớm tạo abstraction sai. Sửa một chỗ làm vỡ chỗ khác. Đoạn trùng nhỏ và rõ thì chờ đến lần thứ ba hãy gộp.
- KISS: chọn cách đơn giản nhất vẫn đúng. Không thêm framework cho một `if`.
- YAGNI: chưa có yêu cầu thì chưa viết. Không thêm interface cho tương lai khi chỉ có một implementation và không cần bản giả để test.
