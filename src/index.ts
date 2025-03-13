import { ACTIONS, SolanaAgentKit, startMcpServer } from "solana-agent-kit";
import * as dotenv from "dotenv";
import { splToken } from "@goat-sdk/plugin-spl-token";
import { sendSOL, solana } from "@goat-sdk/wallet-solana";

dotenv.config();

/**
 * Initialize and start the Solana Agent MCP server
 */
async function main(): Promise<void> {
  try {
    // Check for required environment variables
    if (!process.env.SOLANA_PRIVATE_KEY) {
      throw new Error("SOLANA_PRIVATE_KEY environment variable is required");
    }
    if (!process.env.RPC_URL) {
      throw new Error("RPC_URL environment variable is required");
    }

    // Initialize the Solana Agent Kit
    const agent = new SolanaAgentKit(
      process.env.SOLANA_PRIVATE_KEY,
      process.env.RPC_URL,
      {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
      }
    );

    // Configure the actions available to the MCP server
    const mcp_actions = {
      GET_ASSET: ACTIONS.GET_ASSET_ACTION,
      DEPLOY_TOKEN: ACTIONS.DEPLOY_TOKEN_ACTION,
      // Add additional actions as needed
    };

    console.error("Starting Solana Agent MCP Server...");
    
    // Start the MCP server
    await startMcpServer(
      mcp_actions, 
      agent, 
      { 
        name: "solana-agent", 
        version: "0.0.1" 
      }
    );
    
    console.error("Solana Agent MCP Server running");
  } catch (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
  }
}

// Start the server
main();
