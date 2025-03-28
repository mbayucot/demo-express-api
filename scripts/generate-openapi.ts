// scripts/generate-openapi.ts
import { swaggerSpec } from "../src/config/swagger";
import fs from "fs";
import yaml from "js-yaml";

const outputPath = "./openapi.yaml";

const yamlStr = yaml.dump(swaggerSpec);

fs.writeFileSync(outputPath, yamlStr, "utf8");

console.log(`✅ OpenAPI spec written to ${outputPath}`);
