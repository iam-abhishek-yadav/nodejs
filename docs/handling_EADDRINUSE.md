- **Identify the Process using the Port**
	   ```bash
	   sudo lsof -i :{PORT_NUMBER}
	   ```

- **Terminate the Process**
   ```bash
   kill -9 <PID>
   ```


   The `-9` flag sends a SIGKILL signal to forcefully terminate the process.

- **Restart Your Server:** After terminating the process, retry starting your server on the desired port.