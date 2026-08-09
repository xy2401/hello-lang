# Python 3.10 Structural Pattern Matching
def handle_command(command):
    match command:
        case ("move", x, y):
            print(f"Command: Move(x={x}, y={y}) -> Moving to ({x}, {y})")
        case "quit":
            print("Command: Quit -> Quitting application")
        case _:
            print("Unknown command")

handle_command(("move", 10, 20))
handle_command("quit")
