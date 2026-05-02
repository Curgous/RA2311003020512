import axios from "axios";

async function Log(stack, level, packageName, message) {

    if (stack.toLowerCase() !== "backend" && stack.toLowerCase() !== "frontend") {
        return "invalid stack name";
    }
    if (level.toLowerCase() !== "debug" && level.toLowerCase() !== "info" && level.toLowerCase() !== "error" && level.toLowerCase() !== "warn" && level.toLowerCase() !== "fatal") {
        return "invalid level name";
    }
    const bdy = {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: packageName.toLowerCase(),
        message: message.toLowerCase()
    };
    console.log("check");
    const tk = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ0azc0MDRAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjk2NSwiaWF0IjoxNzc3NzAyMDY1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYTQ5Y2JiOWUtYTNiZS00YTBhLTliY2QtNDQ1ZTQ0NWQzYmVkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGhhcnVuIGt1bWFyIGpvdGhpbGluZ2FtIiwic3ViIjoiZDEzZTg4YmMtNTVhMi00NmEyLWIwMjktNjJlYjhjNGE2ZDEwIn0sImVtYWlsIjoidGs3NDA0QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoidGhhcnVuIGt1bWFyIGpvdGhpbGluZ2FtIiwicm9sbE5vIjoicmEyMzExMDAzMDIwNTEyIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiZDEzZTg4YmMtNTVhMi00NmEyLWIwMjktNjJlYjhjNGE2ZDEwIiwiY2xpZW50U2VjcmV0IjoiYmhRZHJKdHV0SmdFamRCcCJ9.SfCK0xrZNPLK8QJFCELMV8N0Vl-8A8fSwOK29eRdqCg";
    await axios.post(
        "http://20.207.122.201/evaluation-service/logs",
        bdy,
        {
            headers: {
                Authorization: `Bearer ${tk}`,
                "Content-Type": "application/json"
            }
        }
    ).then((response) => {
        console.log("Logging done");
    }).catch((error) => {
        console.error("Error has happened", error);
    }
    );
}
export default Log;