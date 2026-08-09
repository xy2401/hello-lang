<?php
// PHP 8.1 - 8.3 Core Features Demo

// Enum (PHP 8.1)
enum ServerStatus: string {
    case Active = 'active';
    case Maintenance = 'maintenance';
}

// Readonly Class & Named Arguments (PHP 8.2 & PHP 8.0)
readonly class UserProfile {
    public function __construct(
        public int $id,
        public string $username,
        public ServerStatus $status
    ) {}
}

$user = new UserProfile(
    username: 'Alice',
    id: 101,
    status: ServerStatus::Active
);

// Match Expression (PHP 8.0)
$message = match ($user->status) {
    ServerStatus::Active => 'Server is running normally',
    ServerStatus::Maintenance => 'Server is under maintenance',
};

echo "PHP Version: " . PHP_VERSION . "\n";
echo "User: {$user->username} (ID: {$user->id})\n";
echo "Status: {$user->status->value} -> {$message}\n";
