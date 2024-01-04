## Handling Error: listen EADDRINUSE: address already in use :::PORT_NUMBE

If you encounter the "EADDRINUSE: address already in use" error while trying to start a server on a specific port, it means that the port is already in use by another process. Follow the steps below to close the server and resolve the issue.

#### Step 1: Identify the Process using the Port

Use the following command to find the process ID (PID) associated with the port, e.g., port 3000:

```bash
sudo lsof -i :{PORT_NUMBER}
```

#### Step 2: Terminate the process

Now that you have the PID, use the following command to terminate the process:

```
kill -9 <PID>
```

This command forcefully terminates the process using the specified PID.

After completing these steps, you should be able to restart your server on the desired port without encountering the "EADDRINUSE" error.