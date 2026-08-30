# ☕ Java 总览


这里按 LTS 版本整理 Java 的主要语言、类库与 JVM 变化，涵盖 **JDK 8、JDK 11、JDK 17、JDK 21、JDK 25**。

---

## Java LTS 版本

```mermaid
timeline
    title Java LTS 版本路线
    2014 : JDK 8 LTS
         : Lambda 表达式 / Stream API / PermGen 废除 (Metaspace) / HashMap 树化
    2018 : JDK 11 LTS
         : 模块化深化 / Standard HTTP Client / Single-File 执行 / ZGC
    2021 : JDK 17 LTS
         : Record 不可变类 / Sealed 密封类 / Text Blocks 多行文本
    2023 : JDK 21 LTS
         : Virtual Threads (虚拟线程 Project Loom) / Sequenced Collections / Record Patterns
    2025 : JDK 25 LTS
         : Compact Object Headers (8字节对象头) / Flexible Constructor Bodies / Scoped Values / Generational Shenandoah
```

---

## 版本导航

<div class="grid-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 20px;">

<a href="./version/jdk-8" style="text-decoration: none;">
  <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3); padding: 18px; border-radius: 10px; height: 100%;">
    <h3 style="margin: 0 0 8px 0; color: #fbbf24;"><span class="language-brand-icon language-brand-icon--java" aria-hidden="true"></span>JDK 8 LTS</h3>
    <p style="margin: 0; font-size: 0.875rem; color: #94a3b8;">JEP 126 (Lambda), JEP 107 (Stream), JEP 122 (Metaspace), JEP 180 (HashMap 红黑树树化)。</p>
  </div>
</a>

<a href="./version/jdk-11" style="text-decoration: none;">
  <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.3); padding: 18px; border-radius: 10px; height: 100%;">
    <h3 style="margin: 0 0 8px 0; color: #38bdf8;"><span class="language-brand-icon language-brand-icon--java" aria-hidden="true"></span>JDK 11 LTS</h3>
    <p style="margin: 0; font-size: 0.875rem; color: #94a3b8;">JEP 323 (var in Lambda), JEP 321 (HTTP Client), JEP 330 (Single-File), JEP 333 (ZGC)。</p>
  </div>
</a>

<a href="./version/jdk-17" style="text-decoration: none;">
  <div style="background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.3); padding: 18px; border-radius: 10px; height: 100%;">
    <h3 style="margin: 0 0 8px 0; color: #c084fc;"><span class="language-brand-icon language-brand-icon--java" aria-hidden="true"></span>JDK 17 LTS</h3>
    <p style="margin: 0; font-size: 0.875rem; color: #94a3b8;">JEP 395 (Records), JEP 409 (Sealed Classes), JEP 378 (Text Blocks), JEP 394 (Pattern Matching)。</p>
  </div>
</a>

<a href="./version/jdk-21" style="text-decoration: none;">
  <div style="background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.3); padding: 18px; border-radius: 10px; height: 100%;">
    <h3 style="margin: 0 0 8px 0; color: #4ade80;"><span class="language-brand-icon language-brand-icon--java" aria-hidden="true"></span>JDK 21 LTS</h3>
    <p style="margin: 0; font-size: 0.875rem; color: #94a3b8;">JEP 444 (Virtual Threads), JEP 431 (Sequenced Collections), JEP 440 (Record Patterns), JEP 439 (Generational ZGC)。</p>
  </div>
</a>

<a href="./version/jdk-25" style="text-decoration: none;">
  <div style="background: rgba(236, 72, 153, 0.08); border: 1px solid rgba(236, 72, 153, 0.3); padding: 18px; border-radius: 10px; height: 100%;">
    <h3 style="margin: 0 0 8px 0; color: #f472b6;"><span class="language-brand-icon language-brand-icon--java" aria-hidden="true"></span>JDK 25 LTS</h3>
    <p style="margin: 0; font-size: 0.875rem; color: #94a3b8;">JEP 512 (Instance Main), JEP 513 (Flexible Constructor), JEP 506 (Scoped Values), JEP 519 (Compact Headers), JEP 521 (Generational Shenandoah)。</p>
  </div>
</a>

</div>
