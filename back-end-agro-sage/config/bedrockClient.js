import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";
import dotenv from "dotenv";
dotenv.config();

export const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
});
