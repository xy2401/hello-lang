<?php
// 4.1 结构化数据定义 (Class)
class Person {
    public function __construct(
        public string $name,
        public int $age
    ) {}

    public function getInfo(): string {
        return "{$this->name} ({$this->age} years old)";
    }
}

// 3.1 函数定义与参数 (Function)
function calculateBonus(float $base, float $ratio = 0.1): float {
    return $base * $ratio;
}

// 1.1 变量声明与常量
define("LANG", "PHP");
// 1.2 基本数据类型
$age = 25;
$salary = 8500.50;
$isActive = true;

echo "Language: " . LANG . "\n";

// 2.1 条件分支
if ($isActive) {
    echo "Status: Active Worker\n";
} else {
    echo "Status: Inactive Worker\n";
}

// 2.2 集合与循环遍历
$skills = ["Composer", "Laravel", "OpCache"];
echo "Skills: " . implode(" ", $skills) . "\n";

// 3.1 函数调用
$bonus = calculateBonus($salary, 0.1);
echo "Calculated Bonus: $" . number_format($bonus, 2) . "\n";

// 4.1 实例化类
$p = new Person("Alice", $age);
echo "Person Info: " . $p->getInfo() . "\n";
