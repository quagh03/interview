---
title: "Open/Closed Principle là gì?"
topic: "Design Pattern"
section: "SOLID"
level: junior
tags: ["SOLID","OCP"]
order: 302
---

- Mở để thêm hành vi, đóng với việc sửa nhánh đã ổn định.
- Tính phí ship: thêm `ExpressShipping implements ShippingFee`, không thêm `case` vào method cũ.
- Vẫn được sửa bug. Nguyên tắc nói về thay đổi yêu cầu, không cấm chạm vào code hỏng.
