---
title: "Nên ném exception hay trả mã lỗi?"
topic: "Design Pattern"
section: "Clean Code"
level: mid
tags: ["Clean Code","Exception"]
order: 323
---

- Việc không thuộc luồng bình thường thì ném exception, ví dụ hết hàng hoặc gateway timeout. Đừng bắt caller kiểm tra `null` hoặc `-1` qua nhiều tầng.
- Checked exception chỉ khi caller bắt buộc phải xử lý và còn cách xử lý. Trường hợp còn lại dùng unchecked.
- Không nuốt exception bằng `catch` rỗng. Log một lần ở biên, kèm ngữ cảnh, rồi bọc thành lỗi nghiệp vụ nếu cần.
- Mã lỗi hợp với biên ngoài, như HTTP status hoặc mã đối tác trả về. Luồng nội bộ không nên truyền tay mã số.
