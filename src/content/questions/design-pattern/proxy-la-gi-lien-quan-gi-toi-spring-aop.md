---
title: "Proxy là gì? Liên quan gì tới Spring AOP?"
topic: "Design Pattern"
section: "Structural"
level: mid
tags: ["Structural","Proxy"]
order: 311
---

- Proxy cũng bọc cùng interface, nhưng để kiểm soát truy cập: kiểm tra quyền, cache kết quả, gọi remote, hoặc tạo object muộn.
- Decorator thêm hành vi cho object. Proxy đứng ở cửa trước khi cho vào object thật.
- Spring AOP tạo proxy quanh bean. `@Transactional` không có hiệu lực khi một method trong class gọi method `@Transactional` khác của chính class đó, vì lời gọi nội bộ không đi qua proxy.
