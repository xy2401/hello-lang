// Kotlin 2.0 Core Features Demo

sealed interface UserStatus {
    data class Active(const val lastLogin: String) : UserStatus
    object Maintenance : UserStatus
}

data class User(val id: Int, val name: String, val status: UserStatus)

fun main() {
    val user = User(101, "Alice", UserStatus.Active("2026-08-05"))

    // Smart Cast 2.0 & When Expression
    val statusMsg = when (val s = user.status) {
        is UserStatus.Active -> "Active since ${s.lastLogin}"
        UserStatus.Maintenance -> "Under Maintenance"
    }

    println("Kotlin 2.0 Runtime Output:")
    println("User: ${user.name} (ID: ${user.id}) -> $statusMsg")
}
