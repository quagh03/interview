---
title: "Singleton là gì? Viết trong Java thế nào?"
topic: "Design Pattern"
section: "Creational"
level: junior
tags: ["Creational","Singleton"]
order: 306
---

- Một instance cho cả process. Hợp với thứ thật sự chỉ có một, như cấu hình đã load hoặc meter registry.
- Trong Java, enum một hằng chịu được reflection và serialization.

```java
public enum AppClock {
  INSTANCE;

  public long now() {
    return System.currentTimeMillis();
  }
}
```

- Đừng dùng Singleton để giấu trạng thái toàn cục. Khó test và khó thay implementation.
- Bean Spring mặc định cũng là một instance, nhưng container tạo nó và test có thể đưa bản giả vào.
