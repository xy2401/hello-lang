#include <expected>
#include <iostream>
#include <print>
#include <string_view>

std::expected<double, std::string_view> parse_number(std::string_view input) {
    if (input == "42") {
        return 42.0;
    }
    return std::unexpected("not a supported number");
}

int main() {
    std::cout << "C++23 std::expected & std::print:" << std::endl;
    const auto parsed = parse_number("42");
    if (!parsed) {
        std::println("Parse failed: {}", parsed.error());
        return 1;
    }
    std::println("Parsed value: {:.1f} (Success)", *parsed);
    std::println("std::print formatted output successfully.");
    return 0;
}
