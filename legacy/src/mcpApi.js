import { MCP_CONFIG } from "./mcpConfig";

// Generic function to call MCP server with auth
export async function callMcpApi(path, options = {}) {
  const url = `${MCP_CONFIG.endpoint}${path}`;
  const headers = {
    "Authorization": `Bearer ${MCP_CONFIG.token}`,
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  const response = await fetch(url, {
    ...options,
    headers,
  });
  if (!response.ok) {
    throw new Error(`MCP API error: ${response.status}`);
  }
  return response.json();
}
