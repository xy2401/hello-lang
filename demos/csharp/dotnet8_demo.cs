using System;
using System.Collections.Generic;

namespace DotNet8Demo
{
    // Primary Constructor & Record (C# 12 / .NET 8)
    public record UserProfile(int Id, string Username, string Role);

    public class Program
    {
        public static void Main()
        {
            var user = new UserProfile(101, "Alice", "Admin");

            // Collection Expressions (C# 12)
            int[] numbers = [1, 2, 3, 4, 5];
            List<string> roles = ["Admin", "Developer", "Manager"];

            // Pattern Matching
            string status = user switch
            {
                { Role: "Admin" } => "Full Access Granted",
                { Role: "Developer" } => "Developer Access",
                _ => "Restricted Access"
            };

            Console.WriteLine($".NET Version: {Environment.Version}");
            Console.WriteLine($"User: {user.Username} (Role: {user.Role}) -> {status}");
            Console.WriteLine($"Collection Expression count: {numbers.Length}, roles count: {roles.Count}");
        }
    }
}
