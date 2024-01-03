using Microsoft.AspNetCore.SignalR;

namespace WebApplication1.Hubs
{
    public class ChatHub:Hub
    {
        public override async Task OnConnectedAsync()
        {
            // Log connected event
            Console.WriteLine($"Client connected: {Context.ConnectionId}");
            Console.Write( "\n" );

            await Clients.Clients(Context.ConnectionId).SendAsync("getConnectionId", Context.ConnectionId);
            // Send a notification to the connected client
           await  Clients.Client(Context.ConnectionId).SendAsync("ReceiveMessage", "Server", "You are connected!");

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // Log disconnected event
            Console.WriteLine($"Client disconnected: {Context.ConnectionId}");

            // Send a notification to all clients about the disconnection
            await Clients.All.SendAsync("ReceiveMessage", "Server", exception != null ? $"A client has disconnected {exception.Message}." : "A client has disconnected.");

            await base.OnDisconnectedAsync(exception);
    }
        //public async Task SendMessageToCaller(string user, string message)
        //    => await Clients.Caller.SendAsync("ReceiveMessage", user, message);

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
